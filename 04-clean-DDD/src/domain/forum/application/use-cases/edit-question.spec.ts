import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repostory"
import { beforeEach, describe, expect, it } from "vitest"
import { makeQuestion } from "../../../../../test/factories/make-question"
import { UniqueEntityId } from "../../../../core/entities/unique-entities-id"
import { EditQuestionUseCase } from "./edit-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to Edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-1',
        title: 'Pergunta',
        content:'Conteudo teste'
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
        title: 'Pergunta',
        content:'Conteudo teste'
    })
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-2',
        title: 'Pergunta',
        content:'Conteudo teste'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})