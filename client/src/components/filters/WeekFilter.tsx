import { SelectorIcon } from "@heroicons/react/solid"
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"

export default function WeekFilters({
  numberOfWeeks,
  selected,
  setSelected,
}: {
  numberOfWeeks: number
  selected: any
  setSelected: any
}) {
  const weeks = [{ id: 1, name: "All weeks" }]
  for (let i = numberOfWeeks; i >= 1; --i)
    weeks.push({ id: i + 1, name: "Week " + i })
  const handleChange = (week: number) => {
    if (week == 1) setSelected({ id: 1, name: "All weeks" })
    else setSelected({ id: week, name: `Week ${week - 1}` })
  }
  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline"
        rightIcon={<SelectorIcon height={16} width={16} />}
      >
        {selected.name}
      </MenuButton>
      <MenuList maxH="200px" overflowY="auto">
        {weeks.map((week) => {
          return (
            <MenuItem key={week.id} onClick={() => handleChange(week.id)}>
              {week.name}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}
