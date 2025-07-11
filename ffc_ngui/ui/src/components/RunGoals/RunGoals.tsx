import GoalLabel from "components/GoalLabel";

const RunGoals = ({ goals = {}, displayInOneLine = false }) =>
  Object.entries(goals).map(([key, { name, value, target_value: targetValue, reached, unit }]) => (
    <div key={key}>
      <GoalLabel
        name={name}
        goalValue={value}
        targetGoalValue={targetValue}
        reached={reached}
        unit={unit}
        displayInOneLine={displayInOneLine}
      />
    </div>
  ));

export default RunGoals;
