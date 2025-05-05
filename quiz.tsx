"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Question from "@/components/question"
import Results from "@/components/results"
import { questions } from "@/data/questions"
import { Progress } from "@/components/ui/progress"

type Answer = {
  questionId: number
  selectedOption: string
  correctOption: string
  isCorrect: boolean
}

export default function Quiz() {
  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState<typeof questions>([])
  const [userAnswers, setUserAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (started && selectedQuestions.length === 0) {
      // Randomly select 100 questions
      const shuffled = [...questions].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 100)
      setSelectedQuestions(selected)
      setLoading(false)
    }
  }, [started, selectedQuestions.length])

  const handleStart = () => {
    setStarted(true)
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (!selectedOption || !selectedQuestions[currentQuestionIndex]) return

    const currentQuestion = selectedQuestions[currentQuestionIndex]
    const correctOption = currentQuestion.answer

    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption,
      correctOption,
      isCorrect: selectedOption === correctOption,
    }

    setUserAnswers([...userAnswers, answer])
    setSelectedOption(null)

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedQuestions([])
    setUserAnswers([])
    setSelectedOption(null)
    setShowResult(false)
    setLoading(true)
  }

  if (!started) {
    return (
      <Card className="mx-auto max-w-3xl p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">Welcome to the IKS Practice Quiz</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          This quiz contains 100 randomly selected questions about Indian Knowledge Systems. You will see one question
          at a time. Select your answer and click Submit to move to the next question.
        </p>
        <Button onClick={handleStart} size="lg">
          Start Quiz
        </Button>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="mx-auto max-w-3xl p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">Loading Questions...</h2>
        <Progress value={30} className="w-full" />
      </Card>
    )
  }

  if (showResult) {
    return <Results answers={userAnswers} totalQuestions={selectedQuestions.length} onRestart={handleRestart} />
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {selectedQuestions.length}
        </div>
        <div className="text-sm font-medium">
          Score: {userAnswers.filter((answer) => answer.isCorrect).length} / {userAnswers.length}
        </div>
      </div>
      <Progress value={(currentQuestionIndex / selectedQuestions.length) * 100} className="mb-6 h-2" />

      {selectedQuestions[currentQuestionIndex] && (
        <Question
          question={selectedQuestions[currentQuestionIndex]}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
        />
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmit} disabled={!selectedOption}>
          {currentQuestionIndex === selectedQuestions.length - 1 ? "Finish" : "Submit & Next"}
        </Button>
      </div>
    </div>
  )
}
