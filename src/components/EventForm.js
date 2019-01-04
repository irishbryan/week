import React, { Component } from "react";
import styled from "styled-components";
import { Flex, Box } from "rebass";
import PropTypes from "prop-types";

import theme from "../theme";
import Icon from "./Icon";

const Input = styled.input`
  font-size: ${theme.fontSizes[1] + "px"};
  padding: 5px;
  margin: 2px 0px 0px 2px;
`;

class EventForm extends Component {
  state = { inputFieldValue: "" };

  componentDidMount() {
    const { event } = this.props;
    this.setState({ inputFieldValue: event.name });
  }

  handleChange(event) {
    this.setState({ inputFieldValue: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { event } = this.props;
    const { inputFieldValue } = this.state;

    this.props.toggleEditMode();
    this.props.updateEvent(event.id, inputFieldValue, event.start, event.end);
  }

  render() {
    const { inputFieldValue } = this.state;
    const { event, deleteEvent } = this.props;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <Flex justifyContent="space-between">
          <Box>
            {/* TODO: Should be an auto expanding textarea. */}
            <Input
              autoFocus={true}
              value={inputFieldValue}
              onChange={e => this.handleChange(e)}
            />
          </Box>
          <Box>
            <Flex>
              <Box mt={2}>
                {/* TODO: Is there a more idiomatic way to submit without a button? */}
                <Icon
                  className="oi"
                  data-glyph="check"
                  onClick={e => this.handleSubmit(e)}
                />
              </Box>
              <Box mt={2} mx={2}>
                <Icon
                  className="oi"
                  data-glyph="trash"
                  onClick={() => deleteEvent(event.id)}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </form>
    );
  }
}

EventForm.propTypes = {
  event: PropTypes.object.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired
};

export default EventForm;
