"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type QuestionType = {
  id: number
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  answer: string
}

type QuestionProps = {
  question: QuestionType
  selectedOption: string | null
  onOptionSelect: (option: string) => void
}

export default function Question({ question, selectedOption, onOptionSelect }: QuestionProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-medium leading-relaxed">{question.question}</h3>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup value={selectedOption || ""} onValueChange={onOptionSelect} className="space-y-3">
          {Object.entries(question.options).map(([key, value]) => (
            <div
              key={key}
              className={`flex items-center rounded-lg border p-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
                selectedOption === key ? "border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-gray-800" : ""
              }`}
              onClick={() => onOptionSelect(key)}
            >
              <RadioGroupItem value={key} id={`option-${key}`} className="mr-3" />
              <Label htmlFor={`option-${key}`} className="w-full cursor-pointer">
                {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
