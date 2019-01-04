import React, { Component } from "react";
import { Flex, Box, Text } from "rebass";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import { TimeVariables } from "../utils/time-variables";
import theme from "../theme";
import {
  getEventHeight,
  getTopOfEventPosition,
  getNewEndDate,
  createNewEventBasedOnDrag
} from "../utils/event-utils";

import Icon from "./Icon";
import EventForm from "./EventForm";

const EventWrapper = styled.div`
  position: absolute;
  background-color: ${theme.colors.event};
  border-radius: 3px;
  padding: 2px;
  z-index: 4;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  top: ${props => props.topOffset + "px"};
`;

class Event extends Component {
  state = {
    editMode: false,
    height: 0, // Needed for dynamic duration display.
    topOffset: 0 // Needed for absolute positioning.
  };

  /**
   * Needed due to some complications getting `headerHeight` during componentDidMount.
   * TODO: is to remove the need for this.
   */
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      topOffset: getTopOfEventPosition(props.event.start, props.headerHeight)
    };
  }

  componentDidMount() {
    const { event, headerHeight } = this.props;

    this.setState({
      editMode: event.editMode,
      height: getEventHeight(event.start, event.end),
      topOffset: getTopOfEventPosition(event.start, headerHeight)
    });
  }

  toggleEditMode() {
    this.setState(state => ({ editMode: !state.editMode }));
  }

  /**
   * Called whenever event is resized, resulting in height being updated to
   * reflect new duration. Changes aren't persisted to redux though (see `handleResizeStop`)
   * @param {MouseEvent} e
   * @param {Object} data
   */
  handleResize(e, data) {
    this.setState({ height: data.size.height });
  }

  /**
   * Called when resizing of event is finished and persists changes (aka updates event.end)
   * @param {MouseEvent} e
   * @param {Object} data
   */
  handleResizeStop(e, data) {
    const { event } = this.props;

    this.props.updateEvent(
      event.id,
      event.name,
      event.start,
      getNewEndDate(event.start, data.size.height)
    );
  }

  /**
   * Called when drag action stops and triggers updating of date and time information.
   * @param {DragEvent} e –– provided by `react-draggable` library.
   * @param {Object} data –– provided by `react-draggable` library.
   */
  handleDragStop = (e, data) => {
    const { event, columnWidth } = this.props;

    const newEvent = createNewEventBasedOnDrag(event, data, columnWidth);

    this.props.updateEvent(
      newEvent.id,
      newEvent.name,
      newEvent.start,
      newEvent.end
    );
  };

  render() {
    const { event, columnWidth, updateEvent, deleteEvent } = this.props;

    // TODO: This could probably be calculated elsewhere, but works for now.
    const width = Math.floor(columnWidth * 0.9);

    return (
      <Draggable
        key={String(event.start) + String(event.end)} // Have key update to reset `react-draggable` css.
        grid={[columnWidth, TimeVariables.SEGMENT_PIXEL_HEIGHT]}
        onStop={(e, data) => this.handleDragStop(e, data)}
        handle=".handle"
      >
        <Resizable
          height={this.state.height}
          width={width}
          axis="y"
          draggableOpts={{
            grid: [
              TimeVariables.SEGMENT_PIXEL_HEIGHT,
              TimeVariables.SEGMENT_PIXEL_HEIGHT
            ]
          }}
          minConstraints={[0, TimeVariables.SEGMENT_PIXEL_HEIGHT]}
          onResize={(e, data) => this.handleResize(e, data)}
          onResizeStop={(e, data) => this.handleResizeStop(e, data)}
        >
          <EventWrapper
            topOffset={this.state.topOffset}
            height={this.state.height}
            width={width}
          >
            {!this.state.editMode ? (
              <Flex justifyContent="space-between" m={1}>
                <Box
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  <Text fontSize={1} fontWeight="bold" color="white">
                    {event.name}
                  </Text>
                </Box>
                <Box ml={1}>
                  <Icon
                    className="oi"
                    data-glyph="pencil"
                    onClick={() => this.toggleEditMode()}
                  />
                </Box>
              </Flex>
            ) : (
              <EventForm
                event={event}
                toggleEditMode={() => this.toggleEditMode()}
                updateEvent={updateEvent}
                deleteEvent={deleteEvent}
              />
            )}
            <Icon
              className={`oi handle`}
              data-glyph="move"
              style={{ cursor: "move", color: "#0576b2", position: "absolute", left: 4, bottom: 2 }}
            />
          </EventWrapper>
        </Resizable>
      </Draggable>
    );
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  headerHeight: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

export default Event;
