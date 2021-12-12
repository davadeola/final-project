import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFolderOpen,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light vh-100"
      style={{ width: "6.5vw", justifyContent: "center", position: "fixed" }}
    >
      <ul className="nav nav-pills nav-flush flex-column text-center">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link py-3 ">
              <FontAwesomeIcon icon={faCloudUploadAlt}></FontAwesomeIcon>
              <p>Upload</p>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/clients">
            <a className="nav-link py-3 ">
              <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
              <p>Clients</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/albums">
            <a className="nav-link py-3 ">
              <FontAwesomeIcon icon={faFolderOpen}></FontAwesomeIcon>
              <p>Albums</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
