import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import ShippingPage from '../components/ShippingPage';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import { LightPurpleButton } from '../../../utils/buttonStyles';
import { KeyboardDoubleArrowLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const CheckoutSteps = () => {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                            <LightPurpleButton onClick={() => {
                                navigate("/")
                            }}>
                                <KeyboardDoubleArrowLeft /> Continue Shopping
                            </LightPurpleButton>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {activeStep === 0 &&
                                <ShippingPage handleNext={handleNext} />
                            }
                            {activeStep === 1 &&
                                <PaymentForm handleNext={handleNext} handleBack={handleBack} />
                            }
                            {activeStep === 2 &&
                                <OrderSummary handleNext={handleNext} handleBack={handleBack} />
                            }
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default CheckoutSteps