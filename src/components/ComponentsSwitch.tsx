import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

const ComponentsSwitch = ({
  fields,
  formControl,
}: {
  fields: any;
  formControl: any;
}) => {
  switch (fields.__typename) {
    case "ComponentInputInputField": {
      switch (fields.type) {
        case "checkbox": {
          return (
            <Controller
              render={({ field: { onChange } }) => (
                <FormControlLabel
                  id={fields.id}
                  control={
                    <Checkbox defaultChecked={Boolean(fields.defaultValue)} />
                  }
                  label={fields.label}
                  name={fields.name}
                  className={fields.className}
                  onChange={(event) => {
                    onChange(event);
                  }}
                />
              )}
              defaultValue={fields.defaultValue}
              control={formControl}
              name={fields.name}
            />
          );
        }

        default: {
          return (
            <Controller
              render={({ field: { onChange } }) => (
                <TextField
                  id={fields.id}
                  type={fields.type}
                  label={fields.label}
                  variant='outlined'
                  name={fields.name}
                  placeholder={fields.placeholder}
                  className={fields.className}
                  defaultValue={fields.defaultValue}
                  onChange={(event) => {
                    onChange(event);
                  }}
                />
              )}
              defaultValue={fields.defaultValue}
              control={formControl}
              name={fields.name}
            />
          );
        }
      }
    }
    case "ComponentInputRadioBtn": {
      return (
        <>
          {fields.label && <FormLabel id={fields.id}>{fields.label}</FormLabel>}
          <Controller
            render={({ field: { onChange } }) => (
              <RadioGroup defaultValue={fields.defaultValue} name={fields.name}>
                {fields.RadioField.map((radio: any) => (
                  <FormControlLabel
                    key={radio.id}
                    id={radio.id}
                    label={radio.label}
                    value={radio.value}
                    control={<Radio />}
                    onChange={(event) => {
                      onChange(event);
                    }}
                  />
                ))}
              </RadioGroup>
            )}
            defaultValue={fields.defaultValue}
            control={formControl}
            name={fields.name}
          />
        </>
      );
    }
    default: {
      return <>Empty</>;
    }
  }
};

export default ComponentsSwitch;
