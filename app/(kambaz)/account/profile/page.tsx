import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>

      <FormControl defaultValue="alice" className="mb-2" />
      <FormControl defaultValue="123" type="password" className="mb-2" />
      <FormControl defaultValue="Alice" className="mb-2" />
      <FormControl defaultValue="Wonderland" className="mb-2" />
      <FormControl defaultValue="2000-01-01" type="date" className="mb-2" />
      <FormControl defaultValue="alice@wonderland.com" type="email" className="mb-2" />

      <FormSelect defaultValue="USER" id="wd-role" className="mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Link
        id="wd-signout-btn"
        href="/account/signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
