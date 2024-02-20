import PropTypes from 'prop-types'

const SubHeading = ({ title }) => {
  return <h2>{title}</h2>
}

SubHeading.propTypes = {
  title: PropTypes.string,
}

export default SubHeading
