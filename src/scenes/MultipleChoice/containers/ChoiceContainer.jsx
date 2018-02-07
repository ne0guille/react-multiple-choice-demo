import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as choiceActions from '../data/actions';

import ChoiceList from '../components/ChoiceList/ChoiceList';

class ChoiceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSaving: false, showAlert: false };
    this.handleAnswerChecked = this.handleAnswerChecked.bind(this);
  }

  componentDidMount() {
    if (this.props.questions.length === 0) this.props.actions.fetchChoice('testId')
  }

  handleAnswerChecked(event, questionId){
    const answer = event.currentTarget.value;
    this.props.actions.setChoiceAnswer(answer, questionId);
  }

  render() {
    return (
      <ChoiceList
        questions={this.props.questions}
        isLoading={this.props.isLoading}
        totalScore={this.props.totalScore}
        correctAnswers={this.props.correctAnswers}
        onAnswerChecked={this.handleAnswerChecked}
        onSave={this.props.actions.saveChoice} />
    );
  }
}

export function mapStateToProps({ questions }) {
  return {
    questions: questions.data,
    isLoading: questions.isLoading,
    totalScore : questions.result.totalScore,
    correctAnswers : questions.result.correctAnswers,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(choiceActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoiceContainer);
