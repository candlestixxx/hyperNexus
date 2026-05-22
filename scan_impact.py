import os
import re
import subprocess

targets = ["borg", "hypervisor", "nexus", "aios"]
pattern = re.compile("|".join(targets), re.IGNORECASE)

def get_tracked_files():
    result = subprocess.run(["git", "ls-files"], capture_output=True, text=True)
    return result.stdout.splitlines()

files = get_tracked_files()
files_to_modify_content = []
items_to_rename = set() # Use set to avoid duplicates

for f in files:
    # Check path components for renames
    parts = f.split('/')
    for part in parts:
        if pattern.search(part):
            # We need the actual path to the item that needs renaming
            # If a parent dir needs renaming, it will be found as we check parts
            # e.g. apps/borg-extension/src/file.ts -> apps/borg-extension needs renaming
            # We'll handle this by collecting all prefixes that match
            curr_path = ""
            for p in parts:
                curr_path = os.path.join(curr_path, p) if curr_path else p
                if pattern.search(p):
                    items_to_rename.add(curr_path)
    
    # Check file contents
    try:
        if os.path.isfile(f):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                if pattern.search(content):
                    files_to_modify_content.append(f)
    except Exception:
        pass

print(f"Files to modify content: {len(files_to_modify_content)}")
print(f"Items to rename: {len(items_to_rename)}")

# Print a few examples
print("\nExamples of files to modify content:")
for f in files_to_modify_content[:5]:
    print(f"  {f}")

print("\nExamples of items to rename:")
for i in sorted(list(items_to_rename))[:5]:
    print(f"  {i}")

# Save the full lists to files for the next step
with open("files_to_modify.txt", "w") as f:
    f.write("\n".join(files_to_modify_content))

with open("items_to_rename.txt", "w") as f:
    f.write("\n".join(sorted(list(items_to_rename))))
