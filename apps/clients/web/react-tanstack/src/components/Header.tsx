import MyLink from "./MyLink";

export default function Header() {
  return (
    <header className='bg-cyan-700 p-2 text-cyan-100 shadow-lg shadow-cyan-800'>
      <nav>
        <ul className='flex gap-3'>
          <li>
            <MyLink to='/'>{({ isActive }) => <>Home {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/about'>{({ isActive }) => <>About {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/posts'>{({ isActive }) => <>Post {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/search'>{({ isActive }) => <>Search {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/login'>{({ isActive }) => <>Login {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/dashboard'>{({ isActive }) => <>Dashboard {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/settings'>{({ isActive }) => <>Settings {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink to='/first-level'>
              {({ isActive }) => <>First Level {isActive && "✅"}</>}
            </MyLink>
          </li>
          <li>
            <MyLink to='/layouts/visibleLayout'>
              {({ isActive }) => <>Visible Layouts {isActive && "✅"}</>}
            </MyLink>
          </li>
          {/* <li>
            <MyLink
              to='/layouts'
              
            >
              {({ isActive }) => <>Hidden Layouts {isActive && "✅"}</>}
            </MyLink>
          </li> */}
          <li>
            <MyLink to='/profile'>{({ isActive }) => <>Profile {isActive && "✅"}</>}</MyLink>
          </li>
          <li>
            <MyLink
              to='/steps'

              search={{
                username: "Lumb",
              }}
              activeOptions={{
                includeSearch: true,
              }}
            >
              {({ isActive }) => <>Steps {isActive && "✅"}</>}
            </MyLink>
          </li>
          <li>
            <MyLink
              to='/steps'

              search={{
                username: "Lumb",
                step: 2,
              }}
              activeOptions={{
                includeSearch: false,
              }}
            >
              {({ isActive }) => <>Step 2 {isActive && "✅"}</>}
            </MyLink>
          </li>
        </ul>
      </nav>s
    </header>
  );
}
