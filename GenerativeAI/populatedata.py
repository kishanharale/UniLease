# import psycopg2
# import numpy as np
# from feature_extraction import extract_features  # Assuming extract_features is defined in this module

# # Database connection details
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )
# cursor = connection.cursor()

# def save_listing(name, image_path):
#     """
#     Saves a property listing with its extracted feature vector to the database.
#     """
#     # Extract features from the image
#     features = extract_features(image_path)
    
#     # Convert the feature vector to bytes for storage
#     features_bytes = features.tobytes()

#     # Insert the listing with name, image path, and feature vector into the database
#     insert_query = """
#     INSERT INTO listings (name, file_path, features)
#     VALUES (%s, %s, %s)
#     """
#     cursor.execute(insert_query, (name, image_path, features_bytes))
#     connection.commit()

# def populate_database(properties):
#     """
#     Populates the database with property listings.
#     Each listing contains a name, image path, and feature vector.
#     """
#     for property in properties:
#         name = property["name"]
#         image_path = property["image_path"]
        
#         # Save the listing to the database
#         save_listing(name, image_path)
#         print(f"Inserted {name} into database.")

# # Example list of properties with image paths
# property_images = [
#     {"name": "Cozy Apartment", "image_path": "baxter-crossings-apartments-chesterfield-mo-building.jpg"},
#     {"name": "Modern Villa", "image_path": "west-end-terrace-st-louis-mo-picnic-area.jpg"},
#     {"name": "Beautiful House", "image_path": "image.jpg"},
#     # Add more properties here
# ]

# # Populate the database with initial listings
# populate_database(property_images)

# # Close the database connection
# cursor.close()
# connection.close()

# populate_data.py

## Version 2 with 70% confidence
# import psycopg2
# from feature_extraction import extract_features

# # Database connection
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )
# cursor = connection.cursor()

# def save_listing(name, image_path, features):
#     """
#     Saves a property listing with its extracted feature vector to the database.
#     """
#     # Convert the feature vector to bytes for storage
#     features_bytes = features.tobytes()

#     # Insert the listing with name, image path, and feature vector into the database
#     insert_query = """
#     INSERT INTO listings (name, file_path, features)
#     VALUES (%s, %s, %s)
#     """
#     cursor.execute(insert_query, (name, image_path, features_bytes))
#     connection.commit()

# def populate_database(properties):
#     """
#     Populates the database with property listings.
#     Each listing contains a name, image path, and feature vector.
#     """
#     for property in properties:
#         name = property["name"]
#         image_path = property["image_path"]
        
#         # Extract features for each property image using ResNet50
#         features = extract_features(image_path)
        
#         # Save the extracted features and path to the database
#         save_listing(name, image_path, features)
#         print(f"Inserted {name} with ResNet50 features into database.")

# # Example list of properties with image paths
# property_images = [
#      {"name": "Cozy Apartment", "image_path": "baxter-crossings-apartments-chesterfield-mo-building.jpg"},
#      {"name": "Modern Villa", "image_path": "west-end-terrace-st-louis-mo-picnic-area.jpg"},
#      {"name": "Beautiful House", "image_path": "image.jpg"},

# ]

# # Run the population process
# populate_database(property_images)

# # Close the database connection
# cursor.close()
# connection.close()

# populating datatbase eith EfficientNet80
# import psycopg2
# from feature_extraction import extract_features

# # Database connection
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )
# cursor = connection.cursor()

# def save_listing(name, image_path, features):
#     """
#     Saves a property listing with its extracted feature vector to the database.
#     """
#     features_bytes = features.tobytes()
#     insert_query = """
#     INSERT INTO listings (name, file_path, features)
#     VALUES (%s, %s, %s)
#     """
#     cursor.execute(insert_query, (name, image_path, features_bytes))
#     connection.commit()

# def populate_database(properties):
#     """
#     Populates the database with property listings.
#     """
#     for property in properties:
#         name = property["name"]
#         image_path = property["image_path"]
#         features = extract_features(image_path)
#         save_listing(name, image_path, features)
#         print(f"Inserted {name} with EfficientNetB0 features into database.")

# # List of properties with image paths
# property_images = [
#     {"name": "Cozy Apartment", "image_path": "baxter-crossings-apartments-chesterfield-mo-building.jpg"},
#     {"name": "Modern Villa", "image_path": "west-end-terrace-st-louis-mo-picnic-area.jpg"},
#     {"name": "Beautiful House", "image_path": "image.jpg"},
#     # Add more properties here
# ]

# # Populate the database
# populate_database(property_images)

# cursor.close()
# connection.close()


# populate_data.py
# EfficientNetb3
# import psycopg2
# from feature_extraction import extract_features

# # Database connection
# connection = psycopg2.connect(
#     host="localhost",
#     database="Unilease",
#     user="Nihar",
#     password="Unilease"
# )
# cursor = connection.cursor()

# def save_listing(name, image_path, features):
#     """
#     Saves a property listing with its extracted feature vector to the database.
#     """
#     features_bytes = features.tobytes()
#     insert_query = """
#     INSERT INTO listings (name, file_path, features)
#     VALUES (%s, %s, %s)
#     """
#     cursor.execute(insert_query, (name, image_path, features_bytes))
#     connection.commit()

# def populate_database(properties):
#     """
#     Populates the database with property listings.
#     """
#     for property in properties:
#         name = property["name"]
#         image_path = property["image_path"]
        
#         # Extract features for each property image using EfficientNetB3
#         features = extract_features(image_path)
        
#         # Save the extracted features and path to the database
#         save_listing(name, image_path, features)
#         print(f"Inserted {name} with EfficientNetB3 features into database.")

# # Example list of properties with image paths
# property_images = [
#     {"name": "Cozy Apartment", "image_path": "baxter-crossings-apartments-chesterfield-mo-building.jpg"},
#     {"name": "Modern Villa", "image_path": "west-end-terrace-st-louis-mo-picnic-area.jpg"},
#     {"name": "Beautiful House", "image_path": "image.jpg"},
#     # Add more properties here
# ]

# # Run the population process
# populate_database(property_images)

# # Close the database connection
# cursor.close()
# connection.close()

import psycopg2
from feature_extraction import extract_features,extract_text_features
import json 

# Database connection
connection = psycopg2.connect(
    host="localhost",
    database="Unilease",
    user="Nihar",
    password="Unilease"
)
cursor = connection.cursor()

def save_listing(name, image_path, features):
    """
    Saves a property listing with its extracted feature vector to the database.
    """
    features_bytes = features.tobytes()
    insert_query = """
    INSERT INTO listings (name, file_path, features)
    VALUES (%s, %s, %s)
    """
    cursor.execute(insert_query, (name, image_path, features_bytes))
    connection.commit()

def populate_database(properties):
    """
    Populates the database with property listings.
    """
    for property in properties:
        name = property["name"]
        image_path = property["image_path"]
        
        # Extract features for each property image using EfficientNetB3
        features = extract_features(image_path)
        
        # Save the extracted features and path to the database
        save_listing(name, image_path, features)
        print(f"Inserted {name} with EfficientNetB3 features into database.")

# Example list of properties with image paths
property_images = [
    {"name": "Cozy Apartment", "image_path": "baxter-crossings-apartments-chesterfield-mo-building.jpg"},
    {"name": "Modern Villa", "image_path": "west-end-terrace-st-louis-mo-picnic-area.jpg"},
    {"name": "Beautiful House", "image_path": "image.jpg"},
    # Add more properties here
]

def populate_text_data():
    conn = psycopg2.connect(database="Unilease", user="Nihar", password="Unilease")
    cursor = conn.cursor()
    
    properties = [
        {"name": "Cozy Brown Villa", "color": "brown", "bedrooms": 2, "type": "villa", "location": "downtown", "features_text": "A cozy villa with brown walls located near downtown."},
        {"name": "Modern Apartment", "color": "white", "bedrooms": 3, "type": "apartment", "location": "suburbs", "features_text": "A modern white apartment with three bedrooms in the suburbs."},
        {"name": "Elegant Cottage", "color": "blue", "bedrooms": 1, "type": "cottage", "location": "countryside", "features_text": "A serene blue cottage in the peaceful countryside."},
        # Add more entries as needed
    ]

    for prop in properties:
        text_features_vector = extract_text_features(prop["features_text"])
        text_features_json = json.dumps(text_features_vector)  # assuming this function returns JSON data
        cursor.execute("""
            INSERT INTO Properties (name, color, bedrooms, type, location, text_features)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET text_features = EXCLUDED.text_features
        """, (prop["name"], prop["color"], prop["bedrooms"], prop["type"], prop["location"], text_features_json))
    conn.commit()
    cursor.close()
    conn.close()
    print("Text-based data has been populated successfully.")


# Run the population process
populate_database(property_images)
populate_text_data()

# Close the database connection
cursor.close()
connection.close()