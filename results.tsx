"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle } from "lucide-react"

type Answer = {
  questionId: number
  selectedOption: string
  correctOption: string
  isCorrect: boolean
}

type ResultsProps = {
  answers: Answer[]
  totalQuestions: number
  onRestart: () => void
}

export default function Results({ answers, totalQuestions, onRestart }: ResultsProps) {
  const [activeTab, setActiveTab] = useState("summary")

  const correctAnswers = answers.filter((answer) => answer.isCorrect)
  const score = correctAnswers.length
  const percentage = Math.round((score / totalQuestions) * 100)

  let feedback = ""
  if (percentage >= 90) {
    feedback = "Excellent! You have a strong understanding of Indian Knowledge Systems."
  } else if (percentage >= 70) {
    feedback = "Good job! You have a solid grasp of Indian Knowledge Systems."
  } else if (percentage >= 50) {
    feedback = "Not bad! You have a basic understanding of Indian Knowledge Systems."
  } else {
    feedback = "Keep learning! There's room for improvement in your understanding of Indian Knowledge Systems."
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <div className="mb-2 text-5xl font-bold">{percentage}%</div>
          <p className="text-xl">
            You scored {score} out of {totalQuestions}
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{feedback}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="answers">Your Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{score}</div>
                <div className="text-sm text-green-600 dark:text-green-400">Correct</div>
              </div>
              <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">{totalQuestions - score}</div>
                <div className="text-sm text-red-600 dark:text-red-400">Incorrect</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="answers" className="mt-4">
            <div className="max-h-96 overflow-y-auto">
              {answers.map((answer, index) => (
                <div key={index} className="mb-2 flex items-start rounded-lg border p-3 dark:border-gray-700">
                  <div className="mr-3 mt-1">
                    {answer.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">Question {index + 1}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Your answer: {answer.selectedOption}</div>
                    {!answer.isCorrect && (
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Correct answer: {answer.correctOption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button onClick={onRestart} size="lg">
            Restart Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
