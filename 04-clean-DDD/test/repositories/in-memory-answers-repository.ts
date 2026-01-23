import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryAnswersRepository implements AnswerRepository{

    async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
    }

    async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
    }
    
    public items: Answer[] = []

    async create(answer: Answer){
        this.items.push(answer)
    }
}