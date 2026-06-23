type QuizQuestionFeedbackProps = {
  userName: string;
  isCorrect: boolean;
  onContinue: () => void;
};

export default function QuizQuestionFeedback({
  userName,
  isCorrect,
  onContinue,
}: QuizQuestionFeedbackProps) {
  const firstName = userName.split(" ")[0] || userName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-lg rounded-2xl bg-white px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        dir="rtl"
      >
        {isCorrect ? (
          <>
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              أحسنت يا {firstName} 🎉
            </h2>
            <p className="mt-3 text-sm text-[#717171]">إجابة صحيحة</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-black md:text-3xl">
              لا بأس، حاول مرة أخرى
            </h2>
            <p className="mt-3 text-sm text-[#717171]">إجابة خاطئة</p>
          </>
        )}

        <button
          type="button"
          onClick={onContinue}
          className="mt-8 inline-flex h-12 min-w-40 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          {isCorrect ? "متابعة" : "حاول مجدداً"}
        </button>
      </div>
    </div>
  );
}
