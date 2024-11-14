from retrieve import retrieve_similar_images

# Example image path to test similarity
input_image_path = 'image.jpg'

# Run image similarity search
similar_properties = retrieve_similar_images(input_image_path)

# Display the results
for prop in similar_properties:
    print(f"ID: {prop[0]}, Name: {prop[1]}, Similarity Score: {prop[2]:.4f}")
