<script>
  /**
   * Quiz – multi-question ABCD quiz with sequential unlock & results modal.
   *
   * Props:
   *   questions – array of { question, options, correct, explanation? }
   *   questionBank – array of arrays, each inner array contains variant questions for one slot
   *                  e.g. [[q1a, q1b, q1c], [q2a, q2b], ...] - picks one from each group
   *   shuffleOptions – if true, shuffles the order of options (and adjusts correct index)
   */

  const labels = ['A', 'B', 'C', 'D'];

  let { questions = [], questionBank = [], shuffleOptions = true } = $props();

  // Fisher-Yates shuffle
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Shuffle options and return new question with adjusted correct index
  function shuffleQuestionOptions(q) {
    if (!shuffleOptions || !q.options) return q;
    
    const indexed = q.options.map((opt, idx) => ({ opt, wasCorrect: idx === q.correct }));
    const shuffled = shuffle(indexed);
    const newCorrect = shuffled.findIndex(item => item.wasCorrect);
    
    return {
      ...q,
      options: shuffled.map(item => item.opt),
      correct: newCorrect
    };
  }

  // Generate quiz questions from bank or use provided questions
  function generateQuestions() {
    if (questionBank.length > 0) {
      // Pick one random question from each group in the bank
      return questionBank.map(group => {
        const picked = group[Math.floor(Math.random() * group.length)];
        return shuffleQuestionOptions(picked);
      });
    }
    // Fallback to regular questions (also shuffle options)
    return questions.map(q => shuffleQuestionOptions(q));
  }

  let activeQuestions = $state(generateQuestions());

  let current = $state(0);
  let selected = $state(-1);
  let showWrong = $state(false);
  let showCorrect = $state(false);
  let showResults = $state(false);
  let attempts = $state({});

  function select(idx) {
    if (showCorrect) return;
    selected = idx;
    showWrong = false;
  }

  function confirm() {
    if (selected < 0 || showCorrect) return;
    attempts[current] = (attempts[current] || 0) + 1;

    if (selected === questions[current].correct) {
      showCorrect = true;
    } else {
      showWrong = true;
      selected = -1;
    }
  }

  function next() {
    if (current < questions.length - 1) {
      current++;
      selected = -1;
      showWrong = false;
      showCorrect = false;
    } else {
      showResults = true;
    }
  }

  function resetQuiz() {
    current = 0;
    selected = -1;
    showWrong = false;
    showCorrect = false;
    showResults = false;
    attempts = {};
  }

  function closeResults() {
    showResults = false;
  }

  let totalAttempts = $derived(
    Object.values(attempts).reduce((sum, a) => sum + a, 0)
  );

  let firstTryCount = $derived(
    Object.values(attempts).filter(a => a === 1).length
  );

  let pct = $derived(
    questions.length > 0
      ? Math.round((firstTryCount / questions.length) * 100)
      : 0
  );
</script>

<!-- Quiz card -->
<div class="my-8 rounded-2xl border border-primary-200 bg-white shadow-lg overflow-hidden">
  <!-- Header bar -->
  <div
    class="bg-primary-600 text-white px-6 py-3 flex items-center justify-between text-sm font-semibold tracking-wide"
  >
    <span>📝 Kvíz</span>
    <span>Otázka {current + 1} / {questions.length}</span>
  </div>

  <!-- Body -->
  <div class="px-6 py-5">
    <!-- Progress dots -->
    <div class="flex gap-2 mb-5">
      {#each questions as _, i}
        <div
          class="h-2 flex-1 rounded-full transition-all duration-300
            {i < current || (i === current && showCorrect)
              ? 'bg-green-400'
              : i === current
                ? 'bg-primary-400'
                : 'bg-gray-200'}"
        ></div>
      {/each}
    </div>

    <!-- Question text -->
    <p class="text-lg font-medium text-gray-800 mb-5">{questions[current]?.question}</p>

    <!-- Options A B C D -->
    <div class="grid gap-3">
      {#each questions[current]?.options ?? [] as option, i}
        <button
          type="button"
          onclick={() => select(i)}
          disabled={showCorrect}
          class="w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200
            flex items-center gap-3 text-[15px]
            {showCorrect && i === questions[current].correct
              ? 'border-green-500 bg-green-50 text-green-800 font-semibold'
              : selected === i
                ? 'border-primary-500 bg-primary-50 text-primary-900'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 text-gray-700'}"
        >
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0
              {showCorrect && i === questions[current].correct
                ? 'bg-green-500 text-white'
                : selected === i
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-600'}"
          >
            {labels[i]}
          </span>
          <span>{option}</span>
        </button>
      {/each}
    </div>

    <!-- Feedback messages -->
    {#if showWrong}
      <div class="mt-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
        ❌ Špatná odpověď – zkus to znovu!
      </div>
    {/if}

    {#if showCorrect}
      <div class="mt-4 px-4 py-2.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
        <span class="flex items-center gap-2">
          ✅ Správně!
          {#if questions[current]?.explanation}
            <span class="text-green-600">— {questions[current].explanation}</span>
          {/if}
        </span>
      </div>
    {/if}

    <!-- Action buttons -->
    <div class="mt-5 flex gap-3">
      {#if !showCorrect}
        <button
          type="button"
          onclick={confirm}
          disabled={selected < 0}
          class="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
            {selected < 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'}"
        >
          Potvrdit
        </button>
      {:else}
        <button
          type="button"
          onclick={next}
          class="px-6 py-2.5 rounded-xl font-semibold text-sm bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {current < questions.length - 1 ? 'Další otázka →' : 'Zobrazit výsledky 🏆'}
        </button>
      {/if}
    </div>
  </div>
</div>

<!-- ===== Results Modal ===== -->
{#if showResults}
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="Výsledky kvízu"
  >
    <!-- Backdrop click to close -->
    <button
      type="button"
      class="absolute inset-0 w-full h-full cursor-default"
      onclick={closeResults}
      tabindex="-1"
      aria-label="Zavřít"
    ></button>

    <!-- Modal panel -->
    <div class="relative bg-white rounded-3xl shadow-2xl w-[96vw] max-w-3xl max-h-[92vh] overflow-y-auto p-8">
      <!-- Close X -->
      <button
        type="button"
        onclick={closeResults}
        class="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200
               flex items-center justify-center text-gray-500 hover:text-gray-800 text-xl transition"
      >
        ✕
      </button>

      <!-- Trophy header -->
      <div class="text-center mb-6">
        <div class="text-6xl mb-2">🏆</div>
        <h2 class="text-2xl font-bold text-gray-800">Výsledky kvízu</h2>
      </div>

      <!-- Percentage ring -->
      <div class="flex justify-center mb-8">
        <div class="relative w-36 h-36">
          <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              stroke-width="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={pct >= 80 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'}
              stroke-width="3"
              stroke-dasharray="{pct}, 100"
              stroke-linecap="round"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-3xl font-bold text-gray-800">{pct} %</span>
            <span class="text-xs text-gray-500">na 1. pokus</span>
          </div>
        </div>
      </div>

      <!-- Summary stats -->
      <div class="grid grid-cols-3 gap-4 mb-6 text-center">
        <div class="bg-green-50 rounded-xl p-3">
          <div class="text-2xl font-bold text-green-600">{firstTryCount}</div>
          <div class="text-xs text-green-700">na 1. pokus</div>
        </div>
        <div class="bg-blue-50 rounded-xl p-3">
          <div class="text-2xl font-bold text-blue-600">{questions.length}</div>
          <div class="text-xs text-blue-700">otázek celkem</div>
        </div>
        <div class="bg-amber-50 rounded-xl p-3">
          <div class="text-2xl font-bold text-amber-600">{totalAttempts}</div>
          <div class="text-xs text-amber-700">pokusů celkem</div>
        </div>
      </div>

      <!-- Evaluation: 80% threshold -->
      {#if pct >= 80}
        <div class="mb-6 px-5 py-4 rounded-xl bg-green-50 border border-green-200 text-center">
          <p class="text-base font-bold text-green-700">🎉 Výborně! Dosaženo {pct} % – látku máš dobře zvládnutou.</p>
        </div>
      {:else}
        <div class="mb-6 px-5 py-4 rounded-xl bg-amber-50 border border-amber-300 text-center">
          <p class="text-base font-bold text-amber-700">⚠️ Dosaženo pouze {pct} % (minimum je 80 %)</p>
          <p class="text-sm text-amber-600 mt-1">Zdá se, že jsi danému tématu dostatečně neporozuměl/a. Prostuduj si látku znovu a udělej si kvíz ještě jednou.</p>
        </div>
      {/if}

      <!-- Per-question breakdown -->
      <div class="space-y-2 mb-6">
        {#each questions as q, i}
          <div class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-50 text-sm">
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0
                {(attempts[i] || 0) === 1 ? 'bg-green-500' : 'bg-amber-500'}"
            >
              {i + 1}
            </span>
            <span class="flex-1 text-gray-700 truncate">{q.question}</span>
            <span
              class="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap
                {(attempts[i] || 0) === 1
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'}"
            >
              {attempts[i] || 0}× pokus
            </span>
          </div>
        {/each}
      </div>

      <!-- Modal actions -->
      <div class="flex justify-center gap-4">
        <button
          type="button"
          onclick={resetQuiz}
          class="px-6 py-2.5 rounded-xl font-semibold text-sm bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition"
        >
          Zkusit znovu
        </button>
        <button
          type="button"
          onclick={closeResults}
          class="px-6 py-2.5 rounded-xl font-semibold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Zavřít
        </button>
      </div>
    </div>
  </div>
{/if}
