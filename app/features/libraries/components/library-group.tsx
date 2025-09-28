type LibraryShort = {
  lib_name: string;
  address: string;
};

type GrouppedLibraries = Record<string, Record<string, LibraryShort[]>>;

export function LibraryGroup({ groups }: { groups: GrouppedLibraries }) {
  return (
    <div>
      <ul>
        {Object.entries(groups).map(([group, groupData]) => (
          <li key={group} className="px-2">
            {group}
            <ul>
              {Object.entries(groupData).map(([subGroup, libraries]) => (
                <li key={subGroup} className="px-4">
                  {subGroup}
                  <ul>
                    {libraries.map((lib) => (
                      <li key={lib.lib_name} className="px-6">
                        {lib.lib_name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
