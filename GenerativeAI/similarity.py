# import psycopg2
# import numpy as np
# from feature_extraction import extract_features  # Assuming you have this function
# from sklearn.metrics.pairwise import cosine_similarity

# # Database connection details
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )

# cursor = connection.cursor()

# def load_all_listings():
#     """
#     Retrieve all listings with their features from the database.
#     """
#     cursor.execute("SELECT id, name, file_path, features FROM listings")
#     listings = cursor.fetchall()
    
#     results = []
#     for listing in listings:
#         listing_id, name, file_path, features_blob = listing
#         features_array = np.frombuffer(features_blob, dtype=np.float32)
#         results.append((listing_id, name, file_path, features_array))
    
#     return results

# def find_most_similar(input_features, num_results=5):
#     """
#     Finds the most similar listings by comparing feature vectors.
#     """
#     input_features = input_features.reshape(1, -1)
#     listings = load_all_listings()
    
#     similarities = []
#     for listing in listings:
#         listing_id, name, file_path, features_array = listing
#         similarity = cosine_similarity(input_features, features_array.reshape(1, -1))[0][0]
#         similarities.append((listing_id, name, file_path, similarity))
    
#     similarities.sort(key=lambda x: x[3], reverse=True)
#     return similarities[:num_results]

# def main(input_image_path):
#     """
#     Main function to handle similarity search for a given image.
#     """
#     input_features = extract_features(input_image_path)
#     similar_listings = find_most_similar(input_features)

#     print("Most similar listings:")
#     for listing in similar_listings:
#         print(f"ID: {listing[0]}, Name: {listing[1]}, Similarity Score: {listing[3]:.4f}")

# # Example usage
# input_image_path = "westminister.jpg"  # Replace with an actual test image path
# main(input_image_path)

# # Close the connection
# cursor.close()
# connection.close()


# similarity_search.py
# similarity function ResNet
# import psycopg2
# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# from feature_extraction import extract_features

# # Database connection
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )
# cursor = connection.cursor()

# def load_all_listings():
#     """
#     Retrieve all listings with their features from the database.
#     """
#     cursor.execute("SELECT id, name, file_path, features FROM listings")
#     listings = cursor.fetchall()
    
#     results = []
#     for listing in listings:
#         listing_id, name, file_path, features_blob = listing
#         features_array = np.frombuffer(features_blob, dtype=np.float32)
#         results.append((listing_id, name, file_path, features_array))
    
#     return results

# def find_most_similar(input_features, num_results=5):
#     """
#     Finds the most similar listings by comparing feature vectors.
#     """
#     input_features = input_features.reshape(1, -1)  # Reshape for cosine similarity
#     listings = load_all_listings()
    
#     similarities = []
#     for listing in listings:
#         listing_id, name, file_path, features_array = listing
#         similarity = cosine_similarity(input_features, features_array.reshape(1, -1))[0][0]
#         similarities.append((listing_id, name, file_path, similarity))
    
#     # Sort listings by similarity score in descending order
#     similarities.sort(key=lambda x: x[3], reverse=True)
#     return similarities[:num_results]

# def main(input_image_path):
#     """
#     Main function to handle similarity search for a given image.
#     """
#     input_features = extract_features(input_image_path)
#     similar_listings = find_most_similar(input_features)

#     print("Most similar listings:")
#     for listing in similar_listings:
#         print(f"ID: {listing[0]}, Name: {listing[1]}, Similarity Score: {listing[3]:.4f}")

# # Example usage
# input_image_path = "westminister.jpg"  # Replace with an actual test image path
# main(input_image_path)

# # Close the database connection
# cursor.close()
# connection.close()

# similarity function for EfficientNet80
# import psycopg2
# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# from feature_extraction import extract_features

# # Database connection
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )
# cursor = connection.cursor()

# def load_all_listings():
#     cursor.execute("SELECT id, name, file_path, features FROM listings")
#     listings = cursor.fetchall()
#     results = []
#     for listing in listings:
#         listing_id, name, file_path, features_blob = listing
#         features_array = np.frombuffer(features_blob, dtype=np.float32)
#         results.append((listing_id, name, file_path, features_array))
#     return results

# def find_most_similar(input_features, num_results=5):
#     input_features = input_features.reshape(1, -1)  # Reshape for cosine similarity
#     listings = load_all_listings()
    
#     similarities = []
#     for listing in listings:
#         listing_id, name, file_path, features_array = listing
#         similarity = cosine_similarity(input_features, features_array.reshape(1, -1))[0][0]
#         similarities.append((listing_id, name, file_path, similarity))
    
#     similarities.sort(key=lambda x: x[3], reverse=True)
#     return similarities[:num_results]

# def main(input_image_path):
#     input_features = extract_features(input_image_path)
#     similar_listings = find_most_similar(input_features)
#     print("Most similar listings:")
#     for listing in similar_listings:
#         print(f"ID: {listing[0]}, Name: {listing[1]}, Similarity Score: {listing[3]:.4f}")

# # Test with an input image
# input_image_path = "image.jpg"
# main(input_image_path)

# cursor.close()
# connection.close()


import psycopg2
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from feature_extraction import extract_features

# Database connection
connection = psycopg2.connect(
    host="localhost",
    database="Unilease",
    user="Nihar",
    password="Unilease"
)
cursor = connection.cursor()

def load_all_listings():
    cursor.execute("SELECT id, name, file_path, features FROM listings")
    listings = cursor.fetchall()
    results = []
    for listing in listings:
        listing_id, name, file_path, features_blob = listing
        features_array = np.frombuffer(features_blob, dtype=np.float32)
        results.append((listing_id, name, file_path, features_array))
    return results

# def find_most_similar(input_features, num_results=5):
#     input_features = input_features.reshape(1, -1)  # Reshape for cosine similarity
#     listings = load_all_listings()
    
#     similarities = []
#     for listing in listings:
#         listing_id, name, file_path, features_array = listing
#         similarity = cosine_similarity(input_features, features_array.reshape(1, -1))[0][0]
#         similarities.append((listing_id, name, file_path, similarity))
    
#     similarities.sort(key=lambda x: x[3], reverse=True)
#     return similarities[:num_results]

def find_most_similar(input_features):
    # Load all listings from the database
    listings = load_all_listings()
    similarities = []
    
    # Compute similarity for each listing
    for listing in listings:
        listing_id, name, _, features_array = listing  # Adjust as per your database schema
        similarity_score = np.dot(input_features, features_array) / (np.linalg.norm(input_features) * np.linalg.norm(features_array))
        similarities.append((listing_id, name, _, similarity_score))
    
    # Sort listings by similarity score in descending order
    similar_listings = sorted(similarities, key=lambda x: x[3], reverse=True)
    return similar_listings

def find_most_similar_text(user_text_features, listings, num_results=5):
    results = []
    user_text_features = np.array(user_text_features)

    for listing in listings:
        listing_id, listing_name, listing_text_features = listing
        similarity = np.dot(user_text_features, np.array(listing_text_features)) / (np.linalg.norm(user_text_features) * np.linalg.norm(listing_text_features))
        results.append((listing_id, listing_name, similarity))

    # Sort by similarity score in descending order
    results.sort(key=lambda x: x[2], reverse=True)
    return results[:num_results]

def main(input_image_path):
    input_features = extract_features(input_image_path)
    similar_listings = find_most_similar(input_features)
    print("Most similar listings:")
    for listing in similar_listings:
        print(f"ID: {listing[0]}, Name: {listing[1]}, Similarity Score: {listing[3]:.4f}")

# Test with an input image
input_image_path = "westminister.jpg"
main(input_image_path)

cursor.close()
connection.close()
