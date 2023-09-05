import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { formsQuery } from "../../queries/forms";
import request from "graphql-request";
import { getDataAttributes } from "../../utils/getters";
import { Controller, useForm } from "react-hook-form";
import ComponentsSwitch from "../../components/ComponentsSwitch";
import { Box, Container, Grid, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

const FormCreator = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [formsState, setFormsState] = useState<any>();

  const { data }: { data: any } = useQuery({
    queryKey: ["forms"],
    queryFn: async () =>
      request("http://localhost:1337/graphql", formsQuery, {
        formId: parseInt("1"),
      }),
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
    <Container maxWidth='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formsState &&
          formsState?.map((form: any) => (
            <Grid
              container
              spacing={2}
              key={
                getDataAttributes(form).id +
                "-" +
                getDataAttributes(form, "FormName")
              }
            >
              <Grid item xs={12} mt={5}>
                <Controller
                  render={({ field: { onChange } }) => (
                    <TextField
                      fullWidth
                      type={"text"}
                      label={"Form Name"}
                      variant='outlined'
                      name={"FormName"}
                      placeholder={"Form Name"}
                      defaultValue={getDataAttributes(form, "FormName")}
                      onChange={onChange}
                    />
                  )}
                  defaultValue={getDataAttributes(form, "FormName")}
                  control={control}
                  name={"FormName"}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field: { onChange } }) => (
                    <Editor
                      tinymceScriptSrc={
                        process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                      }
                      initialValue={getDataAttributes(form, "FormDescription")}
                      onEditorChange={onChange}
                    />
                  )}
                  defaultValue={getDataAttributes(form, "FormDescription")}
                  control={control}
                  name={"FormDescription"}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Form customID: {getDataAttributes(form, "customID")}</p>
              </Grid>
              {getDataAttributes(form).Fields.map(
                (field: any, index: number) => (
                  <Grid
                    item
                    xs={12}
                    key={
                      field.id +
                      "-" +
                      index +
                      "-" +
                      getDataAttributes(form, "customID")
                    }
                  >
                    <ComponentsSwitch fields={field} formControl={control} />
                  </Grid>
                )
              )}
              <Grid item xs={12}>
                <button type='submit'>asd</button>
              </Grid>
            </Grid>
          ))}
      </form>
    </Container>
  );
};

export default FormCreator;
