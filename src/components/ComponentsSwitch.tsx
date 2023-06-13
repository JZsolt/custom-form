import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const ComponentsSwitch = ({ field }: any) => {
  console.log(field);
  switch (field.__typename) {
    case "ComponentInputInputField": {
      switch (field.type) {
        case "checkbox": {
          return (
            <FormControlLabel
              id={field.id}
              control={<Checkbox />}
              label={field.label}
              name={field.name}
              className={field.className}
              value={field.value}
            />
          );
        }

        default: {
          return (
            <TextField
              id={field.id}
              type={field.type}
              label={field.label}
              variant='outlined'
              name={field.name}
              placeholder={field.placeholder}
              className={field.className}
              value={field.value}
            />
          );
        }
      }
    }
    case "ComponentInputRadioBtn": {
      return (
        <>
          <FormLabel id={field.id}>{field.label}</FormLabel>
          <RadioGroup defaultValue={field.defaultValue} name={field.name}>
            {field.RadioField.map((radio: any) => (
              <FormControlLabel
                id={radio.id}
                label={radio.label}
                value={radio.value}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </>
      );
    }
    default: {
      return <>Empty</>;
    }
  }
};

export default ComponentsSwitch;
