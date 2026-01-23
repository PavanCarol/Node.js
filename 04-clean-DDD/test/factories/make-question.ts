import { faker } from '@faker-js/faker'

import { UniqueEntityId } from "../../src/core/entities/unique-entities-id";
import { Question, QuestionProps } from "../../src/domain/forum/enterprise/entities/question";
import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
    override: Partial<QuestionProps> = {},
    id?: UniqueEntityId,

){
    const question = Question.create({
          authorId: new UniqueEntityId(),
          title: faker.lorem.sentence(),
          slug: Slug.create('example-question'),
          content: faker.lorem.text(),
        }, id)

    return question
}