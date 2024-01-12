const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
  </>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

export default Content
