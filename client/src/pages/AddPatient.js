import { Container, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";

// img
import RegisterPatientForm from "../components/AuthPages/RegisterPatientForm";
import DashboardLayout from "../layout/DashboardLayout";

const AddPatient = () => {
  return (
    <>
      <DashboardLayout>
        <Helmet>
          <title>Add Patient | Sanjivni</title>
        </Helmet>

        <Container maxWidth="md" className="form_Container">
          <Typography variant="h4">Add Patient Form</Typography>
          <Typography paragraph color="textSecondary">
            Enter your details below.
          </Typography>
          <RegisterPatientForm />
        </Container>
      </DashboardLayout>

    </>
  );
};

export default AddPatient;
