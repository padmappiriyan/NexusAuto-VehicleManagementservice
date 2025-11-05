export const mockAuth= async (req, res, next) =>{
    req.customerId="mock-customer-id-123";
    next();
}
