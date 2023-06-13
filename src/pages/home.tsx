import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formsQuery } from "../queries/forms";
import request from "graphql-request";
import { getDataAttributes } from "../utils/getters";
import { useForm } from "react-hook-form";
import ComponentsSwitch from "../components/ComponentsSwitch";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formsState, setFormsState] = useState<any>();

  const { data }: { data: any } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => request("http://localhost:1337/graphql", formsQuery),
  });

  useEffect(() => {
    if (data) {
      const { forms } = data;
      setFormsState(forms.data);
    }
  }, [data]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formsState &&
          formsState?.map((form: any) => (
            <div
              key={getDataAttributes(form).id}
              style={{ borderBottom: "1px solid" }}
            >
              <p>Form ID:{form?.id}</p>
              <p>Form name: {getDataAttributes(form, "FormName")}</p>
              <p>Form customID: {getDataAttributes(form, "customID")}</p>
              {getDataAttributes(form).Fields.map((field: any) => (
                <div key={field.id}>
                  <ComponentsSwitch {...register(field.name)} field={field} />
                </div>
              ))}
              <button type='submit'>asd</button>
            </div>
          ))}
      </form>
      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='female'
          name='radio-buttons-group'
        >
          <FormControlLabel value='female' control={<Radio />} label='Female' />
          <FormControlLabel value='male' control={<Radio />} label='Male' />
          <FormControlLabel value='other' control={<Radio />} label='Other' />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Home;
