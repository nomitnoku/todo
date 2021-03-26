import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import CustomDropdown from '../../components/CustomDropdown';
import Utils from '../../utilities/Utils';

const priorityOptions = [
  {
    label: 'High',
    value: 3,
  },
  {
    label: 'Medium',
    value: 2,
  },
  {
    label: 'Low',
    value: 1,
  },
  {
    label: 'None',
    value: 0,
  },
];

class Task extends React.Component {
  constructor(props) {
    super(props);
    const { task } = props;
    const {
      title = '', description = '', due = '', priority = '',
    } = task;
    this.state = {
      title,
      description,
      due,
      priority,
      errors: {},
    };
  }

  handleChange = (key, e) => {
    const { errors } = this.state;
    const newErrors = { ...errors };
    delete newErrors[key];
    this.setState({
      [key]: e.target.value,
      errors: newErrors,
    });
  }

  handleDropdownChange = (data) => {
    this.setState({
      ...data,
    });
  }

  onSave = () => {
    const {
      add, addTask, editTask, task,
    } = this.props;
    const {
      title, description, due, priority,
    } = this.state;
    const errors = {};
    if (title.length < 10) {
      errors.title = 'Title must have atleast 10 charactera';
    }
    if (description.length < 10) {
      errors.description = 'Description must have atleast 10 characters';
    }
    if (Object.keys(errors).length) {
      this.setState({
        errors,
      });
      return;
    }
    if (add) {
      addTask({
        id: uniqid(),
        title,
        description,
        due,
        priority,
        status: 'PENDING',
        createdOn: Utils.getCurrentTime(),
      });
    } else {
      editTask({
        ...task,
        title,
        description,
        due,
        priority,
      });
    }
  }

  render() {
    const {
      title, description, due, priority, errors,
    } = this.state;
    const {
      onCancel, edit, add, view,
    } = this.props;
    return (
      <div
        className="fs-5"
      >
        <div
          className="mb-2 pb-2 fs-4 border-bottom"
        >
          {
            edit && 'Edit Task'
          }
          {
            add && 'Add Task'
          }
          {
            view && 'Task Details'
          }
        </div>
        <Form.Group>
          <Form.Label>
            Summary
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Summary"
            className="fs-5 rounded-0"
            value={title}
            onChange={(e) => {
              this.handleChange('title', e);
            }}
            max={140}
            autoComplete="off"
            autoFocus
            disabled={view}
          />
          {
            errors.title
            && (
            <div
              className="mt-1 text-danger fs-6"
            >
              {errors.title}
            </div>
            )
          }
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            className="fs-5"
            rows={3}
            value={description}
            onChange={(e) => {
              this.handleChange('description', e);
            }}
            max={500}
            autoComplete="off"
            disabled={view}
          />
          {
            errors.description
            && (
            <div
              className="mt-1 text-danger fs-6"
            >
              {errors.description}
            </div>
            )
          }
        </Form.Group>
        <Form.Row
          className="mx-0"
        >
          <Form.Group
            as={Col}
            className="mr-4"
          >
            <Form.Label>
              Due Date
            </Form.Label>
            <Form.Control
              type="date"
              value={due}
              onChange={(e) => {
                this.handleChange('due', e);
              }}
              className="fs-5 rounded-0"
              disabled={view}
            />
          </Form.Group>
          <Form.Group
            as={Col}
          >
            <Form.Label>
              Priority
            </Form.Label>
            <CustomDropdown
              item={{
                key: 'priority',
                displayText: 'Priority',
                options: priorityOptions,
              }}
              selectedVal={priority}
              onChange={this.handleDropdownChange}
              disabled={view}
            />
          </Form.Group>
        </Form.Row>
        <Row
          className="mx-0 justify-content-end"
        >
          <Col
            xs="auto"
            className="pl-0"
          >
            <Button
              variant="secondary"
              className="fs-5"
              onClick={onCancel}
            >
              {
                view
                  ? 'Close'
                  : 'Cancel'
              }
            </Button>
          </Col>
          {
            !view
            && (
            <Col
              xs="auto"
              className="p-0"
            >
              <Button
                className="fs-5"
                onClick={this.onSave}
                disabled={!title || !description || !priority}
              >
                Save
              </Button>
            </Col>
            )
          }
        </Row>
      </div>
    );
  }
}

Task.propTypes = {
  add: PropTypes.bool.isRequired,
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }),
  addTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  view: PropTypes.bool.isRequired,
};

Task.defaultProps = {
  task: null,
};

export default Task;
