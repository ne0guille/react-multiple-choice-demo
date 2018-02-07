import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row } from 'reactstrap';

import './ChoiceList.css';
import Answer from '../Answer/Answer';
import Question from '../Question/Question';
import ChoiceResult from '../ChoiceResult/ChoiceResult';

import Spinner from '../../../../components/Spinner';

class ChoiceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isSaving: false, isChoiceCompleted: false };
    this.onAnswerClicked = this.onAnswerClicked.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.checkChoiceStatus(nextProps);
  }

  onSave() {
    this.setState({ isSaving: true });
    this.props.onSave(this.props.questions.map(q => q.answer));
    setTimeout(() => this.setState({ isSaving: false }), 1000);
  }

  onAnswerClicked(event, questionId) {
    this.props.onAnswerChecked(event, questionId);
  }

  checkChoiceStatus(props) {
    const status = !props.questions.some(q => q.answer.length === 0);
    this.setState({ isChoiceCompleted: status });
  }

  renderChoiceAnswers(options, questionId) {
    const { id, value } = options;

    if (!this.props.correctAnswers.length) {
      return (
        <Answer
          key={id}
          text={value}
          questionId={questionId}
          onAnswerChecked={this.onAnswerClicked}
        />
      )
    }
    else {
      const answer = this.props.correctAnswers.find(a => a.questionId === questionId);

      return (
        <Answer
          key={id}
          text={value}
          questionId={questionId}
          onAnswerChecked={this.onAnswerClicked}
          result={answer.correctAnswer}          
          isCorrect={answer.correctAnswerId === id}
        />)
    }
  }

  renderQuestion(q) {
    return (
      <div key={q.id} className="choice__exam">
        <Question text={q.choice.question} />
        {q.choice.options.map((opt) => this.renderChoiceAnswers(opt, q.id))}
      </div>
    );
  }

  renderSaveButton() {
    return (
      <Row>
        <Button
          onClick={this.onSave}
          disabled={!this.state.isChoiceCompleted || this.state.isSaving}
          className="choice__submit"
          color="primary"
          block
        >{this.state.isSaving ? 'Submiting...' : 'Submit'}
        </Button>
      </Row>
    );
  }

  renderResult() {
    return (
      <Row>
        <ChoiceResult 
          total={this.props.totalScore} 
          count={this.props.correctAnswers.length} 
          />
      </Row>
    );
  }

  render() {
    return (
      <Container className="choice">
        <Spinner isLoading={this.props.isLoading} />
        {!this.props.isLoading &&
          <div>
            {this.props.questions.map((q) =>
              this.renderQuestion(q))
            }
            <hr />
            {!this.props.correctAnswers.length ? 
              this.renderSaveButton():
              this.renderResult() }
          </div>
        }
      </Container>
    );
  }

}

ChoiceList.propTypes = {
  questions: PropTypes.array.isRequired,
  correctAnswers: PropTypes.array.isRequired,
  totalScore: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onAnswerChecked: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ChoiceList;
