(function (global) {
  const HEADER_ALIASES = {
    profile: 'summary',
    objective: 'summary',
    about: 'summary',
    'work experience': 'experience',
    employment: 'experience',
    'education background': 'education',
    academics: 'education',
    skills: 'skills',
    'technical skills': 'skills',
    projects: 'projects',
    certifications: 'certifications',
    awards: 'awards',
    achievements: 'awards',
    contact: 'contact information',
    'contact details': 'contact information'
  };

  function normalizeHeader(raw) {
    const cleaned = raw
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return HEADER_ALIASES[cleaned] || cleaned;
  }

  function isLikelyHeader(line) {
    const trimmed = line.trim();
    if (!trimmed) return false;

    if (trimmed.endsWith(':')) return true;

    const plain = trimmed.replace(/[^a-zA-Z\s]/g, '').trim();
    if (!plain) return false;

    const words = plain.split(/\s+/);
    if (words.length > 5) return false;

    const uppercaseRatio =
      plain.split('').filter((ch) => /[A-Z]/.test(ch)).length /
      Math.max(plain.replace(/\s/g, '').length, 1);

    const titleCaseLike = words.every((word) => /^[A-Z][a-z]*$/.test(word));

    return uppercaseRatio > 0.65 || titleCaseLike;
  }

  function parseResumeSections(text) {
    const lines = text.replace(/\r\n?/g, '\n').split('\n');
    const sections = [];

    let currentHeader = null;
    let currentContent = [];

    const pushCurrent = () => {
      if (!currentHeader) return;
      const content = currentContent.join('\n').trim();
      sections.push({
        header: currentHeader,
        normalizedHeader: normalizeHeader(currentHeader),
        content
      });
    };

    for (const line of lines) {
      if (isLikelyHeader(line)) {
        pushCurrent();
        currentHeader = line.trim().replace(/:$/, '');
        currentContent = [];
      } else {
        if (currentHeader) currentContent.push(line);
      }
    }

    pushCurrent();
    return sections;
  }

  function cloneResume(templateText, sourceText) {
    const templateSections = parseResumeSections(templateText);
    const sourceSections = parseResumeSections(sourceText);

    const sourceMap = new Map();
    for (const section of sourceSections) {
      if (section.content) {
        sourceMap.set(section.normalizedHeader, section.content);
      }
    }

    const kept = [];
    for (const section of templateSections) {
      const matchedContent = sourceMap.get(section.normalizedHeader);
      if (!matchedContent) continue;

      kept.push(`${section.header}\n${matchedContent}`.trim());
    }

    return kept.join('\n\n').trim();
  }

  global.ResumeCloner = {
    cloneResume,
    parseResumeSections,
    normalizeHeader,
    isLikelyHeader
  };
})(typeof window !== 'undefined' ? window : globalThis);
