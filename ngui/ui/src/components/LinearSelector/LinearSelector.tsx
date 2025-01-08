import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import Chip from "components/Chip";
import DashedTypography from "components/DashedTypography";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import Popover from "components/Popover";
import { LINEAR_SELECTOR_ITEMS_TYPES } from "utils/constants";
import { isEmpty as isEmptyObject } from "utils/objects";
import { MPT_SPACING_2, SPACING_1, SPACING_2 } from "../../utils/layouts";
import { processItemDefinition } from "./itemDefinition.helper";
import useStyles from "./LinearSelector.styles";

const NONE = "none";

const MenuItemCheckbox = ({ checked }) => <Checkbox style={{ padding: "0.2rem" }} size="small" checked={checked} />;

const ItemLabel = ({ name, handleChange, dataTestId, displayedName, endAdornment = null }) => {
  const { classes } = useStyles();

  return (
    <DashedTypography onClick={handleChange} component="span" dataTestId={dataTestId} className={classes.label} chipMode>
      {displayedName || <FormattedMessage id={name} />}
      {endAdornment}
    </DashedTypography>
  );
};

const PopoverWrapper = ({ menuBody, buttons, label, labelDataTestId, handleClose }) => (
  <Popover
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    label={label}
    buttons={buttons}
    handleClose={handleClose}
    menu={
      <div
        style={{
          overflow: "auto",
          maxHeight: "350px",
          paddingTop: "8px",
          paddingBottom: "8px",
          minWidth: "100px"
        }}
      >
        {menuBody}
      </div>
    }
    dataTestIds={{
      label: labelDataTestId
    }}
  />
);

const PopoverItem = ({ items, handleChange, labelDataTestId, label, checkboxLabel = null, enableCheckbox = false }) => {
  const [checked, setChecked] = useState(false);
  const { classes } = useStyles();

  return (
    <PopoverWrapper
      label={label}
      menuBody={
        <>
          {enableCheckbox && (
            <MenuItem
              className={classes.checkboxMenuItem}
              onClick={() => setChecked((currentCheckedState) => !currentCheckedState)}
            >
              <MenuItemCheckbox checked={checked} />
              <ListItemText primary={checkboxLabel} />
            </MenuItem>
          )}
          {items.map(({ name: itemName, label: itemLabel, value: itemValue, dataTestId, type: itemType }) => (
            <MenuItem
              key={[itemName, itemValue].filter((value) => value !== undefined).join("")}
              onClick={() => {
                handleChange({ name: itemName, value: itemValue, checked, type: itemType });
              }}
              data-test-id={dataTestId}
            >
              {itemLabel}
            </MenuItem>
          ))}
        </>
      }
      labelDataTestId={labelDataTestId}
    />
  );
};

const MultiPopoverItem = ({ name, items, label, handleApply, values }) => {
  const [selectedItems, setSelectedItems] = useState(values);

  const handleItemClick = (value) => {
    setSelectedItems((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((e) => e !== value);
      }
      return [...prevState, value];
    });
  };

  return (
    <PopoverWrapper
      label={label}
      buttons={[
        {
          messageId: "apply",
          variant: "contained",
          onClick: () => handleApply({ name, value: selectedItems }),
          closable: true,
          dataTestId: "apply_multi_popover_button"
        }
      ]}
      handleClose={() => setSelectedItems(values)}
      menuBody={
        <>
          {items.map(({ name: itemName, label: itemLabel, value: itemValue }) => (
            <MenuItem
              key={[itemName, itemValue].filter((value) => value !== undefined).join("")}
              onClick={() => handleItemClick(itemValue)}
            >
              <MenuItemCheckbox checked={selectedItems.includes(itemValue)} />
              {itemLabel}
            </MenuItem>
          ))}
        </>
      }
    />
  );
};

const PopoverLabelExpandIcon = ({ isOpen }) => {
  const { classes } = useStyles();

  const Icon = isOpen ? KeyboardArrowUpOutlined : KeyboardArrowDownOutlinedIcon;

  return <Icon className={classes.labelIcon} />;
};

const PopoverLabel = ({ name, displayedName, isOpen }) => (
  <ItemLabel name={name} displayedName={displayedName} endAdornment={<PopoverLabelExpandIcon isOpen={isOpen} />} />
);

const Item = ({
  type = LINEAR_SELECTOR_ITEMS_TYPES.TEXT,
  name,
  enablePopoverCheckbox = false,
  checkboxLabel,
  value,
  handleChange,
  handleApply,
  items,
  dataTestId,
  displayedName,
  values
}) => {
  const Component = {
    [LINEAR_SELECTOR_ITEMS_TYPES.MULTISELECT_POPOVER]: () => (
      <MultiPopoverItem
        name={name}
        items={items}
        handleApply={handleApply}
        values={values.filter((el) => el.name === name).map((el) => el.value)}
        label={({ isOpen }) => <PopoverLabel name={name} displayedName={displayedName} isOpen={isOpen} />}
      />
    ),
    [LINEAR_SELECTOR_ITEMS_TYPES.POPOVER]: () => (
      <PopoverItem
        items={items}
        enableCheckbox={enablePopoverCheckbox}
        checkboxLabel={checkboxLabel}
        handleChange={handleChange}
        labelDataTestId={dataTestId}
        label={({ isOpen }) => <PopoverLabel name={name} displayedName={displayedName} isOpen={isOpen} />}
      />
    ),
    [LINEAR_SELECTOR_ITEMS_TYPES.TEXT]: () => (
      <ItemLabel
        name={name}
        displayedName={displayedName}
        handleChange={() => handleChange({ name, value })}
        dataTestId={dataTestId}
      />
    )
  }[type];

  return <Component />;
};

const PickedItem = ({ name, dataTestId = name, value, type, onDelete, displayedName, displayedValue }) => {
  const getChipLabel = () => {
    const nameDisplayed = displayedName || <FormattedMessage id={name} />;
    const valueDisplayed = displayedValue || value;
    const typographyVariant = "subtitle";

    return [LINEAR_SELECTOR_ITEMS_TYPES.POPOVER, LINEAR_SELECTOR_ITEMS_TYPES.MULTISELECT_POPOVER].includes(type) ? (
      <KeyValueLabel
        isBoldValue
        keyText={nameDisplayed}
        value={valueDisplayed}
        variant={typographyVariant}
        dataTestIds={{
          typography: `chip_${dataTestId}_typography`,
          key: `chip_${dataTestId}_key`,
          value: `chip_${dataTestId}_value`
        }}
      />
    ) : (
      <Typography component="div" variant={typographyVariant} data-test-id={`chip_${dataTestId}_label`}>
        {nameDisplayed}
      </Typography>
    );
  };
  return (
    <Chip
      label={getChipLabel()}
      dataTestIds={{
        chip: `chip_${dataTestId}`,
        deleteIcon: `btn_${dataTestId}_close`
      }}
      className={"selectedFilter"}
      color="primary"
      size="medium"
      variant="outlined"
      onDelete={onDelete}
    />
  );
};

const SelectorItems = ({ items, values, onChange, onApply }) => {
  const renderItem = (itemDefinition, notSelectedPopoverItems) => (
    <Box data-test-id={`selector_${itemDefinition.name}`} key={itemDefinition.name}>
      <Item
        {...itemDefinition}
        items={notSelectedPopoverItems}
        handleChange={({ name: itemName, value: itemValue, checked }) => {
          if (typeof onChange === "function") {
            onChange({ name: itemName, value: itemValue, checked });
          }
        }}
        handleApply={onApply}
        values={values}
      />
    </Box>
  );

  return items.reduce((selectorItems, itemDefinition) => {
    const { skip, notSelectedPopoverItems } = processItemDefinition(itemDefinition, values);

    if (skip) {
      return selectorItems;
    }

    return [...selectorItems, renderItem(itemDefinition, notSelectedPopoverItems)];
  }, []);
};

const LinearSelector = ({
  value,
  label,
  items,
  onClear,
  onClearAll,
  onChange,
  onApply,
  dataTestIds = {},
  exposeFirstItem = false
}) => {
  const { label: labelDataTestId } = dataTestIds;
  let expandableItems = [];
  let alwaysVisibleItems = [];

  const [isAccordionVisible, setIsAccordionVisible] = useState(false);

  const getValuesArray = () => {
    if (isEmptyObject(value)) {
      return [];
    }

    return (Array.isArray(value) ? value : [value]).map((pickedValue) => {
      const {
        type: itemType,
        displayedName: itemDisplayedName,
        dataTestId
      } = items.find((item) => item.name === pickedValue.name);

      return {
        name: pickedValue.name,
        value: pickedValue.value,
        displayedName: pickedValue.displayedName || itemDisplayedName,
        displayedValue: pickedValue.displayedValue,
        type: itemType,
        dataTestId
      };
    });
  };

  const valuesArray = getValuesArray();

  const { classes } = useStyles();

  if (exposeFirstItem) {
    const [firstItem, ...rest] = items;
    alwaysVisibleItems = [firstItem];
    expandableItems = rest;
  }

  return (
    <Box>
      <Grid container gap={MPT_SPACING_2} wrap={"nowrap"}>
        {label && (
          <Grid xs={"auto"} md={"auto"} sx={{ lineHeight: SPACING_2 }}>
            <Typography variant={"fontWeightBold"} component="div" data-test-id={labelDataTestId}>
              {label}
              {": "}
            </Typography>
          </Grid>
        )}
        <Grid xs={12} md={11}>
          <Grid container gap={SPACING_1}>
            {valuesArray.length === 0 ? (
              <Typography lineHeight={SPACING_2} component="span">
                <FormattedMessage id={NONE} />
              </Typography>
            ) : (
              <>
                {valuesArray.map((pickedValue) => {
                  const {
                    name: itemName,
                    value: itemValue,
                    displayedValue: itemDisplayedValue,
                    type: itemType,
                    displayedName,
                    dataTestId
                  } = pickedValue;

                  return (
                    <PickedItem
                      key={`${itemName}-${itemValue}`}
                      name={itemName}
                      dataTestId={dataTestId}
                      // equal to node that was defined in "values" array (LinearSelector)
                      // or to node that was defined as a displayedName in items
                      // or <FormattedMessage id={name}/>
                      displayedName={displayedName}
                      displayedValue={itemDisplayedValue}
                      value={itemValue}
                      type={itemType}
                      onDelete={
                        typeof onClear === "function"
                          ? () =>
                              onClear({
                                filterName: itemName,
                                filterValue: itemValue
                              })
                          : undefined
                      }
                    />
                  );
                })}

                {valuesArray.length > 1 && onClearAll ? (
                  <Button
                    dataTestId="btn_clear"
                    startIcon={<DeleteOutlinedIcon />}
                    customClass={classes.clearAllFilters}
                    onClick={onClearAll}
                    messageId="clearFilters"
                    color="error"
                  />
                ) : null}
              </>
            )}
          </Grid>
          <Grid container gap={SPACING_1} marginTop={SPACING_1}>
            <SelectorItems
              items={alwaysVisibleItems.length > 0 ? alwaysVisibleItems : items}
              values={valuesArray}
              onApply={onApply}
              onChange={onChange}
            />

            {isAccordionVisible && expandableItems.length > 0 && (
              <SelectorItems items={expandableItems} values={valuesArray} onApply={onApply} onChange={onChange} />
            )}
            {expandableItems.length > 0 && (
              <Button
                startIcon={isAccordionVisible ? <RemoveIcon /> : <AddIcon />}
                customClass={classes.showMoreFilters}
                variant="text"
                onClick={() => setIsAccordionVisible((prev) => !prev)} // Toggle visibility
                dataTestId="btn_show_more_filters"
                messageId={isAccordionVisible ? "showLess" : "showMore"}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LinearSelector;
