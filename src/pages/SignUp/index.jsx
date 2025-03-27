import { Link, useNavigate } from "react-router"
import supabase from "../../supabase/client";
import { Toaster, toast } from 'sonner';

export default function SignUp() {

    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const {  email, password, username } = Object.fromEntries(new FormData(formRegister));
        let {  error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        })
        if (error) {
            formRegister.reset();
            toast.error('ops something was wrong')
            //console.log("ops something was wrong", error);
        } else {
            toast.success('Registration made successfully');
            console.log(data);
            formRegister.reset();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/")


        }

        //console.log(username, email, password);
        //console.log("Ti stai per registrare");
    };


    return (
        <div className="container">
            <h1 className="d-flex justify-content-center fw-bold">Sign Up</h1>
            <form onSubmit={handleSignUp} className="d-flex flex-column align-items-center">
                <div className="w-50 mt-2">
                    <label htmlFor="username" className="form-label fst-italic">Username</label>
                    <input type="text" className="form-control" name="username" placeholder="Your username..." required/>
                </div>
                <div className="w-50 mt-2">
                    <label htmlFor="email" className="form-label fst-italic">Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Your email..." required/>
                </div>
                <div className="w-50 mt-2">
                    <label htmlFor="password" className="form-label fst-italic">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Your password..." required />
                </div>
                <div className="mt-2 w-25 d-flex flex-column">
                    <button type="submit" className="btn btn-light">Register</button>
                    <small className="d-flex justify-content-center">Already registered?
                        <Link className="mx-1" to={"/login"} >Login!</Link>
                    </small>
                </div>
            </form>
            <Toaster position="top-center" />
        </div>

    )
}
