import SubHeading from '../components/SubHeading'
import Content from '../components/Content'
import TotalExercises from '../components/TotalExercises'

const Course = ({ course }) => {
  return (
    <div>
      <SubHeading title={course.name} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts} />
    </div>
  )
}

export default Course
