const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) =>
  <p>
    <b>
      total of {sum.reduce((total, sum) => total + sum.exercises, 0)} exercises
    </b>
  </p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map((part, i) =>
      <Part key={i} part={part} />
    )}
  </>

const Course = ({ course }) =>
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts} />
  </div>

export default Course