-- This is going to have the insert queries

INSERT IGNORE INTO Instrument_type (type_name) VALUES 
  ("guitar"),  -- 1
  ("piano"), -- 2
  ("violin"), -- 3
  ("drums"), -- 4
  ("harp"), -- 5
  ("accordion"); -- 6

INSERT IGNORE INTO Instrument (name, model, Description, Instrument_type_id) VALUES 
  ("Accoustic guitar", "xyz", NULL, 1),
  ("Amazing piano", "xyz123", NULL, 2),
  ("Smallest violin", "sad67", NULL, 3),
  ("Rock drums", "ROCK", NULL, 4),
  ("Elf's harp", "aaa", NULL, 5),
  ("Big accordion", "harmonikka", NULL, 6);

INSERT IGNORE INTO Item (barcode, rent_day, rent_week, rent_month, is_available, item_condition , Instrument_id_Instrument) VALUES 
  ("kit-001", 10.00, 39.90, 78.99, 1,"excellent", 1),
  ("kit-002", 8.00, 21.90, 50.00, 1, "good",1),
  ("kit-003", 8.00, 21.90, 50.00, 1, "good",1),
  ("pia-001", 50.00, 167.00, 359.99, 1, "excellent",2),
  ("viu-001", 2.99, 10.00, 30.00, 1, "excellent",3),
  ("viu-002", 2.99, 10.00, 30.00, 1, "excellent",3),
  ("rum-001", 20.00, 39.99, 100.00, 1, "excellent",4),
  ("har-001", 25.00, 80.00, 150.00, 1, "good",5),
  ("acc-001", 20.00, 39.99, 98.00, 1, "good",6);