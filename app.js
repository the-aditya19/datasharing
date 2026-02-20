(function () {
  const resumeA = document.getElementById('resumeA');
  const resumeB = document.getElementById('resumeB');
  const result = document.getElementById('result');
  const cloneBtn = document.getElementById('cloneBtn');
  const copyBtn = document.getElementById('copyBtn');

  cloneBtn.addEventListener('click', () => {
    result.value = window.ResumeCloner.cloneResume(resumeA.value, resumeB.value);
  });

  copyBtn.addEventListener('click', async () => {
    if (!result.value) return;
    try {
      await navigator.clipboard.writeText(result.value);
      copyBtn.textContent = 'Copied';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Result';
      }, 1200);
    } catch {
      copyBtn.textContent = 'Copy failed';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Result';
      }, 1200);
    }
  });
})();
