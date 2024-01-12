const TotalExercises = (props) => (
  <p>
    <strong>
      total of {props.parts.reduce((total, part) => part.exercises + total, 0)} exercises
    </strong>
  </p>
)

export default TotalExercises
