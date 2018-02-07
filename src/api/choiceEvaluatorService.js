import { mockedResponses } from './mockedResponses';

export const choiceEvaluator = (answers) => {
   const correctAnswers = answers.map((a, index) => {
       return {
           isCorrect: a === mockedResponses[index].choice.correctAnswer,
           correctAnswer: mockedResponses[index].choice.correctAnswer,
           correctAnswerId: mockedResponses[index].choice.correctAnswerId,
           questionId: mockedResponses[index].id
       }
   })
   const totalScore =  correctAnswers.map(x=> x.isCorrect).reduce((a,b) => b? ++a:a,0);

  return {
      correctAnswers,
      totalScore
  };
}