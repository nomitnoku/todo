import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Container, Row, Col,
} from 'react-bootstrap';

function getCellData(header, row) {
  if (header.renderer) {
    return header.renderer(row);
  }
  return row[header.key];
}

function CustomTable(props) {
  const {
    headers,
    content,
    keyField,
    border,
    hover,
    responsive,
    size,
    striped,
    totalItems,
    groupBy,
    groupData,
    onRowClick,
    noResultFound,
  } = props;

  const tableHeader = (
    <thead>
      <tr>
        {
         headers.map((header) => (
           <th
             key={header.key}
             className="text-medium"
           >
             {
               header.headerRenderer
                 ? header.headerRenderer(header)
                 : (
                   <h5
                     className="my-auto"
                   >
                     <b>
                       {header.displayText}
                     </b>
                   </h5>
                 )
             }
           </th>
         ))
        }
      </tr>
    </thead>
  );

  let tableBody = null;

  if (groupBy && !!groupData) {
    tableBody = (
      <tbody>
        {
          Object.keys(groupData).map((item) => (
            groupData[item].map((row, index) => (
              <tr
                key={row[keyField]}
              >
                {headers.map((header, index1) => {
                  const keyEn = index1 + 1;
                  if (
                    header.key === groupBy
                     && index === 0
                  ) {
                    return (
                      <td
                        key={`${row[keyField]}${row[header.key]}${keyEn}`}
                        rowSpan={groupData[item].length}
                        className="fs-5 font-weight-bold"
                      >
                        {getCellData(header, row)}
                      </td>
                    );
                  } if (
                    header.key === groupBy
                    && index !== 0
                  ) {
                    return null;
                  }
                  return (
                    <td
                      key={`${row[keyField]}${row[header.key]}${keyEn}`}
                      className="fs-5"
                    >
                      {getCellData(header, row)}
                    </td>
                  );
                })}
              </tr>
            ))
          ))
        }
      </tbody>
    );
  } else {
    tableBody = (
      <tbody>
        { content.map((row) => (
          <tr
            key={row[keyField]}
            onClick={() => {
              onRowClick(row);
            }}
          >
            {headers.map((header, index) => {
              const keyEn = index + 1;
              return (
                <td
                  key={`${row[keyField]}${row[header.key]}${keyEn}`}
                  className="fs-5"
                >
                  {getCellData(header, row)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <Container
      fluid
      className="px-0"
      id="custom-table"
    >
      <Row
        className="mx-0 h-100"
      >
        <Col
          xs={24}
          className="px-2 pb-4 table-container"
        >
          <Table
            bordered={border}
            hover={hover}
            responsive={responsive}
            size={size}
            striped={striped}
          >
            {tableHeader}
            {tableBody}
          </Table>
        </Col>
        {
          !totalItems
          && (
          <Col
            xs={24}
            className="fs-5 text-medium px-2 text-center py-4"
          >
            {noResultFound}
          </Col>
          )
        }
      </Row>
    </Container>
  );
}

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({})),
  keyField: PropTypes.string.isRequired,
  border: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  size: PropTypes.string,
  striped: PropTypes.bool,
  totalItems: PropTypes.number,
  noResultFound: PropTypes.element,
  groupBy: PropTypes.string,
  groupData: PropTypes.shape({}),
  onRowClick: PropTypes.func,
};

CustomTable.defaultProps = {
  content: [],
  border: false,
  hover: true,
  responsive: true,
  size: 'sm',
  striped: false,
  totalItems: 0,
  noResultFound: null,
  groupBy: null,
  groupData: null,
  onRowClick: () => {},
};

export default CustomTable;
