export default function CompletedTrainingCourses({ courses }) {
  if (!courses || courses.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <h2 className="text-white font-bold text-2xl mb-6">COMPLETED INSURANCE TRAINING COURSES</h2>
      <div className="space-y-2">
        {courses.map((course, idx) => (
          <div key={idx} className="flex items-start">
            <span className="text-teal-400 mr-3">•</span>
            <p className="text-gray-300">{course}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
