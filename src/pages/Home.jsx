import React from 'react';
import {
  Button,
  Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap';
import CustomDropdown from '../components/CustomDropdown';
import CustomModal from '../components/CustomModal';
import CustomTable from '../components/CustomTable';
import Svg from '../components/Svg';
import Constant from '../utilities/Constant';
import Task from '../layouts/task/Task';
import Utils from '../utilities/Utils';

const groupByOptions = [
  {
    label: 'Created On',
    value: 'createdOn',
  },
  {
    label: 'Pending On',
    value: 'due',
  },
  {
    label: 'Priority',
    value: 'priority',
  },
  {
    label: 'None',
    value: 'none',
  },
];

const tabOptions = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
];

const priorityLabels = {
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'None',
};

const sortByPriority = (tasks, sortingFactor) => (
  tasks.sort((a, b) => {
    if (a.priority > b.priority) {
      return sortingFactor;
    }
    if (a.priority < b.priority) {
      return -sortingFactor;
    }
    return 0;
  })
);

const sortByDate = (tasks, key, sortingFactor) => (
  tasks.sort((a, b) => {
    const date1 = a[key] && new Date(a[key]).getTime();
    const date2 = b[key] && new Date(b[key]).getTime();
    if (!date1) {
      return sortingFactor;
    }
    if (!date2) {
      return -sortingFactor;
    }
    if (!!date1 && !!date2) {
      if (date1 > date2) {
        return sortingFactor;
      }
      if (date1 < date2) {
        return -sortingFactor;
      }
    }
    return 0;
  })
);

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      groupBy: 'none',
      searchText: '',
      tab: 'ALL',
      tasks: [
        {
          createdOn: '2021-03-27',
          description: 'For Dental Checkup',
          due: '2021-03-04',
          id: 'kmr959yk',
          priority: 3,
          status: 'PENDING',
          title: 'Doctor Appointement',
        },
      ],
      sorting: {},
      addTask: false,
      editTask: null,
      viewTask: null,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleGroupByChange = (data) => {
    this.setState({
      ...data,
      sorting: {},
    });
  }

  editTask = (task) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    const index = tasks.findIndex((item) => item.id === task.id);
    newTasks[index] = { ...task };
    this.setState({
      editTask: false,
      tasks: newTasks,
    });
  }

  addTask = (task) => {
    const { tasks } = this.state;
    this.setState({
      tasks: [task, ...tasks],
      addTask: false,
    });
  }

  deleteTask = (task) => {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.filter((item) => item.id !== task.id),
    });
  }

  render() {
    const {
      groupBy, searchText, tab, tasks, sorting, addTask, editTask,
      viewTask,
    } = this.state;

    const sortingHeader = (item) => (
      <Row
        className="mx-0 align-items-center cursor-pointer"
        onClick={() => {
          this.setState({
            sorting: {
              [item.key]: item.sortingFactor === -1 ? 1 : -1,
            },
          });
        }}
      >
        <Col
          className="fs-5 pl-0"
        >
          {item.displayText}
        </Col>
        {
          item.sortingFactor
          && (
          <Col
            xs="auto"
            className={`p-0 bg-primary d-flex align-items-center ${
              item.sortingFactor === -1 ? 'rotate-180' : ''
            }`}
          >
            <Svg
              svg="arrowHead"
              width="16"
              stroke={Constant.Color.WHITE}
            />
          </Col>
          )
        }
      </Row>
    );

    const headers = [
      {
        key: 'title',
        displayText: 'Summary',
        renderer: (item) => (
          item.status === 'COMPLETED'
          && tab === 'ALL'
            ? (
              <del>
                {item.title}
              </del>
            )
            : item.title
        ),
      },
      {
        key: 'priority',
        displayText: 'Priority',
        headerRenderer: sortingHeader,
        sortingFactor: sorting.priority || null,
        renderer: (item) => (
          item.status === 'COMPLETED'
          && tab === 'ALL'
            ? (
              <del>
                { priorityLabels[item.priority]}
              </del>
            )
            : priorityLabels[item.priority]
        ),
      },
      {
        key: 'createdOn',
        displayText: 'Created On',
        headerRenderer: sortingHeader,
        sortingFactor: sorting.createdOn || null,
        renderer: (item) => (
          item.status === 'COMPLETED'
          && tab === 'ALL'
            ? (
              <del>
                {item.createdOn}
              </del>
            )
            : item.createdOn
        ),
      },
      {
        key: 'due',
        displayText: 'Due By',
        headerRenderer: sortingHeader,
        sortingFactor: sorting.due || null,
        renderer: (item) => (
          item.status === 'COMPLETED'
          && tab === 'ALL'
            ? (
              <del>
                {item.due}
              </del>
            )
            : item.due
        ),
      },
      {
        key: 'action',
        displayText: 'Actions',
        renderer: (item) => (
          <Row
            className="mx-0"
          >
            <Col
              xs="auto"
              className="cursor-pointer mr-1 py-1 px-2 bg-link"
              onClick={(e) => {
                e.stopPropagation();
                this.setState({
                  editTask: item,
                });
              }}
            >
              <Svg
                svg="edit"
                width="16"
                height="16"
                stroke={Constant.Color.WHITE}
              />
            </Col>
            {
               item.status === 'PENDING'
                 ? (
                   <Col
                     xs="auto"
                     className="cursor-pointer py-1 px-2 mr-1
                     bg-green text-white"
                     onClick={(e) => {
                       e.stopPropagation();
                       this.editTask({
                         ...item,
                         status: 'COMPLETED',
                       });
                     }}
                   >
                     Done
                   </Col>
                 )
                 : (
                   <Col
                     xs="auto"
                     className="cursor-pointer py-1 px-2 mr-1
                      bg-primary text-white"
                     onClick={(e) => {
                       e.stopPropagation();
                       this.editTask({
                         ...item,
                         status: 'PENDING',
                         createdOn: Utils.getCurrentTime(),
                       });
                     }}
                   >
                     Re-open
                   </Col>
                 )
            }
            <Col
              xs="auto"
              className="cursor-pointer py-1 px-2 bg-danger"
              onClick={(e) => {
                e.stopPropagation();
                this.deleteTask(item);
              }}
            >
              <Svg
                svg="trash"
                width="18"
                height="18"
                stroke={Constant.Color.WHITE}
              />
            </Col>
          </Row>
        ),
      },
    ];

    let filteredTasks = tasks;

    if (tab !== 'ALL') {
      filteredTasks = filteredTasks.filter((item) => item.status === tab);
    }

    if (searchText) {
      filteredTasks = filteredTasks.filter((item) => (
        new RegExp(searchText, 'i').test(item.title)));
    }

    let groupData = null;
    if (groupBy !== 'none') {
      groupData = filteredTasks.reduce((acc, item) => {
        if (acc[item[groupBy]]) {
          acc[item[groupBy]].push(item);
        } else {
          acc[item[groupBy]] = [item];
        }
        return acc;
      }, {});
      Object.keys(groupData).forEach((item) => {
        if (sorting.priority) {
          groupData[item] = sortByPriority(
            groupData[item],
            sorting.priority,
          );
        }

        if (sorting.createdOn) {
          groupData[item] = sortByDate(
            groupData[item],
            'createdOn',
            sorting.createdOn,
          );
        }

        if (sorting.due) {
          groupData[item] = sortByDate(
            groupData[item],
            'due',
            sorting.due,
          );
        }
      });
    } else {
      if (sorting.priority) {
        filteredTasks = sortByPriority(
          filteredTasks,
          sorting.priority,
        );
      }

      if (sorting.createdOn) {
        filteredTasks = sortByDate(
          filteredTasks,
          'createdOn',
          sorting.createdOn,
        );
      }

      if (sorting.due) {
        filteredTasks = sortByDate(
          filteredTasks,
          'due',
          sorting.due,
        );
      }
    }

    return (
      <div
        className="h-100"
      >
        <CustomModal
          show={addTask || !!editTask || !!viewTask}
          size="md"
          closeButton
          body={(
            <Task
              add={addTask}
              edit={!!editTask}
              view={!!viewTask}
              task={editTask || viewTask || {}}
              addTask={this.addTask}
              editTask={this.editTask}
              onCancel={() => {
                this.setState({
                  addTask: false,
                  editTask: null,
                  viewTask: null,
                });
              }}
            />
          )}
          onHide={() => {
            this.setState({
              addTask: false,
              editTask: null,
              viewTask: null,
            });
          }}
        />
        <Container
          className="h-100"
        >
          <Row
            className="flex-column h-100"
          >
            <Col
              className="mb-3"
            >
              <Row
                className="align-items-center"
              >
                <Col
                  xs={24}
                  sm="auto"
                >
                  <CustomDropdown
                    item={{
                      key: 'groupBy',
                      displayText: 'Group By',
                      options: groupByOptions,
                    }}
                    closeButton={false}
                    onChange={this.handleGroupByChange}
                    selectedVal={groupBy}
                  />
                </Col>
                <Col
                  xs={24}
                  sm="auto"
                  className="px-2 py-1"
                >
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        className="rounded-0"
                      >
                        <Svg
                          svg="search"
                          width="0.9rem"
                          fill={Constant.Color.DARK}
                        />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className="fs-5 rounded-0"
                      value={searchText}
                      onChange={this.handleOnChange}
                      autoComplete="off"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Col>
            <Col
              className="mb-2"
            >
              <Row
                className="mx-0 align-items-center"
              >
                {
                  tabOptions.map((item) => (
                    <Col
                      xs="auto"
                      className={`px-4 ${tab === item.value
                        ? 'selected-tab' : 'tab'}`}
                      onClick={() => {
                        this.setState({
                          tab: item.value,
                        });
                      }}
                    >
                      {item.label}
                    </Col>
                  ))
                }
              </Row>
            </Col>
            <Col
              className="px-2 flex-grow-1"
            >
              <div
                className="h-100"
              >
                <CustomTable
                  headers={headers}
                  content={filteredTasks}
                  keyField="id"
                  border
                  totalItems={filteredTasks.length}
                  groupBy={groupBy}
                  groupData={groupData}
                  hover={false}
                  noResultFound={null}
                  onRowClick={(task) => {
                    this.setState({
                      viewTask: task,
                    });
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <Button
          onClick={() => {
            this.setState({
              addTask: true,
            });
          }}
          className="add-task fs-1 py-1 px-3"
        >
          +
        </Button>
      </div>
    );
  }
}

export default Home;
