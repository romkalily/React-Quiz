import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        results: {}, //{id success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{id success erro}
        quiz: [
            {
                question: 'What is your name?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    { text: 'Solomiia', id: 1 },
                    { text: 'Silka', id: 2 },
                    { text: 'Solya', id: 3 },
                    { text: 'Solik', id: 4 }
                ]
            },
            {
                question: 'What is your favoutite car?',
                rightAnswerId: 1,
                id: 2,
                answers: [
                    { text: 'G-class', id: 1 },
                    { text: 'S-class', id: 2 },
                    { text: 'Camaro', id: 3 },
                    { text: 'Mustang', id: 4 }
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }

        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results



        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler =()=> {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>

                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                quizLength={this.state.quiz.length}
                                onAnswerClick={this.onAnswerClickHandler}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            ></ActiveQuiz>
                    }
                </div>
            </div>
        )
    }
}
export default Quiz