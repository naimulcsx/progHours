const Tags = (cell) => {
  const { tags } = cell.row.original.problem
  if (tags.length === 0) return "—"
  return (
    <ul className="flex space-x-2">
      {tags.map((tag) => {
        return (
          <li
            key={tag.id}
            className="bg-primary bg-opacity-10 text-primary px-2 py-1 text-sm rounded-lg"
          >
            {tag.name}
          </li>
        )
      })}
    </ul>
  )
}
export default Tags
