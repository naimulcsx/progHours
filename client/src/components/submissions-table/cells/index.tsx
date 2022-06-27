import Actions from "./editable/Actions"
import DatePicker from "./editable/DatePicker"
import ProblemName from "./non-editable/ProblemName"
import SolveTime from "./editable/SolveTime"
import Tags from "./non-editable/Tags"
import Verdict from "./editable/Verdict"
import NonEditableVerdict from "./non-editable/Verdict"
import NonEditableDate from "./non-editable/Date"
import NonEditableTags from "./non-editable/Tags"

export const EditableCells = {
  Actions,
  DatePicker,
  SolveTime,
  Verdict,
  Tags,
}

export const NonEditableCells = {
  ProblemName,
  Tags: NonEditableTags,
  Verdict: NonEditableVerdict,
  Date: NonEditableDate,
}
