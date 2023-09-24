import { faker } from "@faker-js/faker";

import { Table, Text } from "@mantine/core";

import { DashboardLayout } from "~/modules/common/components/DashboardLayout";

export default function GroupActivityPage() {
  return (
    <DashboardLayout>
      <Table withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            {Array(30)
              .fill(0)
              .map((_, i) => {
                return <Table.Th>{i + 1}</Table.Th>;
              })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array(100)
            .fill(0)
            .map((el) => {
              return (
                <Table.Tr>
                  <Table.Td>
                    <Text lineClamp={1} size="sm" variant="proghours-ui-strong">
                      {faker.person.fullName()}
                    </Text>
                    {/* <Text lineClamp={1} size="sm">
                      C
                      {faker.number.int({
                        max: 181120,
                        min: 181001
                      })}
                    </Text> */}
                  </Table.Td>
                  {Array(30)
                    .fill(0)
                    .map((el) => {
                      const solved =
                        Math.random() < 0.1 ? faker.number.int(15) : 0;
                      const colors = ["#2d6a4f", "#40916c", "#74c69d"];
                      let background = "transparent";

                      if (solved >= 10) background = colors[0];
                      else if (solved >= 5) background = colors[1];
                      else if (solved > 0) background = colors[2];

                      return (
                        <Table.Td style={{ background }}>
                          {solved ? solved : ""}
                        </Table.Td>
                      );
                    })}
                </Table.Tr>
              );
            })}
        </Table.Tbody>
      </Table>
    </DashboardLayout>
  );
}
