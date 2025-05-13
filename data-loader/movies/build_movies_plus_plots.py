import os
import json

def combine_json_files(input_directory, output_file):
    """
    Combine all JSON files in a directory into a single JSON file containing a JSON array.

    :param input_directory: Path to the directory containing JSON files.
    :param output_file: Path to the output JSON file.
    """
    json_array = []

    # Iterate through all files in the directory
    for filename in os.listdir(input_directory):
        if filename.endswith('.json'):
            file_path = os.path.join(input_directory, filename)

            try:
                # Open and load the JSON file
                with open(file_path, 'r') as file:
                    data = json.load(file)
                    json_array.append(data)
            except Exception as e:
                print(f"Error reading {filename}: {e}")

    # Write the combined JSON array to the output file
    try:
        with open(output_file, 'w') as outfile:
            json.dump(json_array, outfile, indent=4)
        print(f"Combined JSON file saved as {output_file}")
    except Exception as e:
        print(f"Error writing to {output_file}: {e}")

# Example usage
if __name__ == "__main__":
    input_directory = "./tmp"  # Replace with the path to your JSON files
    output_file = "movies_plus_plots.json"               # Replace with the desired output file name
    combine_json_files(input_directory, output_file)
