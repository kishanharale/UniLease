from retrieve import retrieve_similar_text

# Example text input for similarity search
user_text_input = {
    "color": "brown",
    "bedrooms": 2,
    "type": "villa",
    "location": "downtown"
}

# Run text similarity search
similar_text_properties = retrieve_similar_text(user_text_input)

# Display the results
for prop in similar_text_properties:
    print(f"ID: {prop[0]}, Name: {prop[1]}, Similarity Score: {prop[2]:.4f}")
