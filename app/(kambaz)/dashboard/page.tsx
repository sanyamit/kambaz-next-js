import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3800" className="wd-dashboard-course-link">
            <Image src="/images/theoryOfComp.jpg" width={200} height={150} alt="thoeryOfComp" />
            <div>
              <h5>CS3800 Theory of Computation</h5>
              <p className="wd-dashboard-course-title">
                Theory of Computation
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/java-oops.jpg" width={200} height={150} alt="java-oops" />
            <div>
              <h5>CS3456 Java</h5>
              <p className="wd-dashboard-course-title">
                Object-oriented programming
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/python-ds.jpg" width={200} height={150} alt="python-ds" />
            <div>
              <h5>DS3000 Python</h5>
              <p className="wd-dashboard-course-title">
                Foundations of Data Science
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/database.jpg" width={200} height={150} alt="database" />
            <div>
              <h5>CS5678 Databases</h5>
              <p className="wd-dashboard-course-title">
                Database Design
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpg" width={200} height={150} alt="algo" />
            <div>
              <h5>CS3500 Algorithms</h5>
              <p className="wd-dashboard-course-title">
                Algorithms & Data Structures
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/4100" className="wd-dashboard-course-link">
            <Image src="/images/ai.jpg" width={200} height={150} alt="ai" />
            <div>
              <h5>CS4100 AI</h5>
              <p className="wd-dashboard-course-title">
                Artificial Intelligence
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
