-- This is going to have the insert queries

INSERT IGNORE INTO Instrument_type (type_name) VALUES 
  ("guitar"),  -- 1
  ("piano"), -- 2
  ("violin"), -- 3
  ("drums"), -- 4
  ("harp"), -- 5
  ("accordion"); -- 6

INSERT IGNORE INTO Instrument (name, model, Description, Instrument_type_id) VALUES 
  ("Acoustic guitar", "xyz", "A warm, versatile acoustic guitar suitable for all skill levels.", 1),
("Amazing piano", "xyz123", "A bright upright piano with excellent key response and tone.", 2),
("Smallest violin", "sad67", "A compact violin, great for young students or travel.", 3),
("Rock drums", "ROCK", "A full rock drum kit built for high-energy performances.", 4),
("Elf's harp", "aaa", "A delicate, beautifully decorated harp with a soft, magical tone.", 5),
("Big accordion", "harmonikka", "A large, full-bodied accordion ideal for folk and dance music.", 6),

  -- 5 more guitars (type_id = 1)
  ("Classical guitar", "CG-101", "A nylon-string classical guitar, great for fingerpicking.", 1),
  ("Electric guitar", "Fender Stratocaster", "Iconic electric guitar with bright, versatile tone.", 1),
  ("Bass guitar", "Gibson SG Bass", "Deep, punchy bass guitar for rhythm sections.", 1),
  ("12-string guitar", "Takamine GJ72CE", "Rich, full sound with doubled strings.", 1),
  ("Travel guitar", "Martin LX1", "Compact size, perfect for musicians on the go.", 1),

  -- 3 more pianos (type_id = 2)
  ("Grand piano", "Steinway Model D", "Concert grand piano with a powerful, resonant tone.", 2),
  ("Upright piano", "Yamaha U1", "Compact upright piano, ideal for smaller spaces.", 2),
  ("Digital piano", "Roland RD-88", "Stage digital piano with weighted keys and built-in sounds.", 2),

  -- 3 more violins (type_id = 3)
  ("Student violin", "Stentor II", "Affordable and durable violin for beginners.", 3),
  ("Professional violin", "Stradivari Copy", "Handcrafted violin with warm, rich tone.", 3),
  ("Electric violin", "Yamaha YEV104", "Silent electric violin, great for modern performances.", 3),

  -- 2 more drums (type_id = 4)
  ("Jazz drum kit", "Pearl Session Studio", "Compact and warm-sounding kit built for jazz.", 4),
  ("Electronic drum kit", "Roland TD-17KV", "Versatile e-kit with realistic feel and low noise.", 4),

  -- 3 more harps (type_id = 5)
  ("Lever harp", "Salvi Ana", "Mid-size lever harp suitable for folk and Celtic music.", 5),
  ("Pedal harp", "Lyon & Healy Style 23", "Full-size orchestral pedal harp.", 5),
  ("Mini harp", "Roosebeck Minstrel", "Small lap harp, easy to carry and beginner-friendly.", 5),

  -- 4 more accordions (type_id = 6)
  ("Piano accordion", "Hohner Bravo III", "Classic piano accordion with a bright Italian sound.", 6),
  ("Button accordion", "Weltmeister Achat", "Compact diatonic button accordion for folk music.", 6),
  ("Bass accordion", "Bugari Armando", "Large accordion with extended bass capabilities.", 6),
  ("Toy accordion", "Scarlatti SC-ACC", "Small beginner accordion, fun for kids and starters.", 6);

INSERT IGNORE INTO Item (barcode, rent_day, rent_week, rent_month, is_available, item_condition, Instrument_id_Instrument) VALUES

  -- Acoustic guitar (1) → gui-001 to gui-003
  ("gui-001", 10.00, 39.90, 78.99, 1, "excellent", 1),
  ("gui-002", 8.00, 21.90, 50.00, 1, "good", 1),
  ("gui-003", 8.00, 21.90, 50.00, 1, "good", 1),

  -- Classical guitar (7) → gui-004 to gui-006
  ("gui-004", 9.00, 35.00, 70.00, 1, "excellent", 7),
  ("gui-005", 7.00, 28.00, 58.00, 1, "good", 7),
  ("gui-006", 7.00, 28.00, 58.00, 1, "good", 7),

  -- Electric guitar (8) → gui-007 to gui-009
  ("gui-007", 12.00, 45.00, 90.00, 1, "excellent", 8),
  ("gui-008", 10.00, 38.00, 75.00, 1, "good", 8),
  ("gui-009", 10.00, 38.00, 75.00, 1, "good", 8),

  -- Bass guitar (9) → gui-010 to gui-011
  ("gui-010", 11.00, 42.00, 85.00, 1, "excellent", 9),
  ("gui-011", 9.00, 35.00, 70.00, 1, "good", 9),

  -- 12-string guitar (10) → gui-012 to gui-014
  ("gui-012", 13.00, 48.00, 95.00, 1, "excellent", 10),
  ("gui-013", 11.00, 40.00, 80.00, 1, "good", 10),
  ("gui-014", 11.00, 40.00, 80.00, 1, "good", 10),

  -- Travel guitar (11) → gui-015 to gui-016
  ("gui-015", 7.00, 25.00, 55.00, 1, "excellent", 11),
  ("gui-016", 6.00, 20.00, 45.00, 1, "good", 11),

  -- Amazing piano (2) → pia-001 to pia-002
  ("pia-001", 50.00, 167.00, 359.99, 1, "excellent", 2),
  ("pia-002", 45.00, 150.00, 320.00, 1, "good", 2),

  -- Grand piano (12) → pia-003 to pia-004
  ("pia-003", 80.00, 250.00, 599.99, 1, "excellent", 12),
  ("pia-004", 70.00, 220.00, 520.00, 1, "good", 12),

  -- Upright piano (13) → pia-005 to pia-007
  ("pia-005", 40.00, 130.00, 280.00, 1, "excellent", 13),
  ("pia-006", 35.00, 110.00, 240.00, 1, "good", 13),
  ("pia-007", 35.00, 110.00, 240.00, 1, "good", 13),

  -- Digital piano (14) → pia-008 to pia-009
  ("pia-008", 30.00, 95.00, 199.99, 1, "excellent", 14),
  ("pia-009", 25.00, 80.00, 170.00, 1, "good", 14),

  -- Smallest violin (3) → vio-001 to vio-003
  ("vio-001", 2.99, 10.00, 30.00, 1, "excellent", 3),
  ("vio-002", 2.99, 10.00, 30.00, 1, "excellent", 3),
  ("vio-003", 2.50, 8.00, 25.00, 1, "good", 3),

  -- Student violin (15) → vio-004 to vio-006
  ("vio-004", 2.50, 8.00, 22.00, 1, "excellent", 15),
  ("vio-005", 2.00, 6.50, 18.00, 1, "good", 15),
  ("vio-006", 2.00, 6.50, 18.00, 1, "good", 15),

  -- Professional violin (16) → vio-007 to vio-008
  ("vio-007", 8.00, 28.00, 70.00, 1, "excellent", 16),
  ("vio-008", 7.00, 24.00, 60.00, 1, "good", 16),

  -- Electric violin (17) → vio-009 to vio-011
  ("vio-009", 6.00, 20.00, 50.00, 1, "excellent", 17),
  ("vio-010", 5.00, 17.00, 42.00, 1, "good", 17),
  ("vio-011", 5.00, 17.00, 42.00, 1, "good", 17),

  -- Rock drums (4) → dru-001 to dru-002
  ("dru-001", 20.00, 39.99, 100.00, 1, "excellent", 4),
  ("dru-002", 15.00, 32.00, 85.00, 1, "good", 4),

  -- Jazz drum kit (18) → dru-003 to dru-004
  ("dru-003", 18.00, 55.00, 120.00, 1, "excellent", 18),
  ("dru-004", 15.00, 45.00, 100.00, 1, "good", 18),

  -- Electronic drum kit (19) → dru-005 to dru-006
  ("dru-005", 22.00, 65.00, 140.00, 1, "excellent", 19),
  ("dru-006", 18.00, 55.00, 120.00, 1, "good", 19),

  -- Elf's harp (5) → har-001 to har-002
  ("har-001", 25.00, 80.00, 150.00, 1, "good", 5),
  ("har-002", 28.00, 90.00, 170.00, 1, "excellent", 5),

  -- Lever harp (20) → har-003 to har-005
  ("har-003", 20.00, 65.00, 130.00, 1, "excellent", 20),
  ("har-004", 18.00, 58.00, 115.00, 1, "good", 20),
  ("har-005", 18.00, 58.00, 115.00, 1, "good", 20),

  -- Pedal harp (21) → har-006 to har-007
  ("har-006", 40.00, 130.00, 280.00, 1, "excellent", 21),
  ("har-007", 35.00, 110.00, 240.00, 1, "good", 21),

  -- Mini harp (22) → har-008 to har-010
  ("har-008", 10.00, 32.00, 70.00, 1, "excellent", 22),
  ("har-009", 8.00, 26.00, 58.00, 1, "good", 22),
  ("har-010", 8.00, 26.00, 58.00, 1, "good", 22),

  -- Big accordion (6) → acc-001 to acc-002
  ("acc-001", 20.00, 39.99, 98.00, 1, "good", 6),
  ("acc-002", 22.00, 45.00, 110.00, 1, "excellent", 6),

  -- Piano accordion (23) → acc-003 to acc-004
  ("acc-003", 18.00, 55.00, 115.00, 1, "excellent", 23),
  ("acc-004", 15.00, 45.00, 95.00, 1, "good", 23),

  -- Button accordion (24) → acc-005 to acc-007
  ("acc-005", 15.00, 45.00, 95.00, 1, "excellent", 24),
  ("acc-006", 12.00, 38.00, 80.00, 1, "good", 24),
  ("acc-007", 12.00, 38.00, 80.00, 1, "good", 24),

  -- Bass accordion (25) → acc-008 to acc-009
  ("acc-008", 22.00, 68.00, 145.00, 1, "excellent", 25),
  ("acc-009", 18.00, 55.00, 120.00, 1, "good", 25),

  -- Toy accordion (26) → acc-010 to acc-012
  ("acc-010", 5.00, 15.00, 35.00, 1, "excellent", 26),
  ("acc-011", 4.00, 12.00, 28.00, 1, "good", 26),
  ("acc-012", 4.00, 12.00, 28.00, 1, "good", 26);
  
  INSERT IGNORE INTO Item (barcode, rent_day, rent_week, rent_month, is_available, item_condition, Instrument_id_Instrument) VALUES

  -- Acoustic guitar (1) → gui-017 to gui-023
  ("gui-017", 10.00, 39.90, 78.99, 1, "excellent", 1),
  ("gui-018", 8.00, 21.90, 50.00, 1, "good", 1),
  ("gui-019", 8.00, 21.90, 50.00, 1, "good", 1),
  ("gui-020", 10.00, 39.90, 78.99, 1, "excellent", 1),
  ("gui-021", 8.00, 21.90, 50.00, 1, "good", 1),
  ("gui-022", 8.00, 21.90, 50.00, 1, "good", 1),
  ("gui-023", 10.00, 39.90, 78.99, 1, "excellent", 1),

  -- Classical guitar (7) → gui-024 to gui-030
  ("gui-024", 9.00, 35.00, 70.00, 1, "excellent", 7),
  ("gui-025", 7.00, 28.00, 58.00, 1, "good", 7),
  ("gui-026", 7.00, 28.00, 58.00, 1, "good", 7),
  ("gui-027", 9.00, 35.00, 70.00, 1, "excellent", 7),
  ("gui-028", 7.00, 28.00, 58.00, 1, "good", 7),
  ("gui-029", 7.00, 28.00, 58.00, 1, "good", 7),
  ("gui-030", 9.00, 35.00, 70.00, 1, "excellent", 7),

  -- Electric guitar (8) → gui-031 to gui-037
  ("gui-031", 12.00, 45.00, 90.00, 1, "excellent", 8),
  ("gui-032", 10.00, 38.00, 75.00, 1, "good", 8),
  ("gui-033", 10.00, 38.00, 75.00, 1, "good", 8),
  ("gui-034", 12.00, 45.00, 90.00, 1, "excellent", 8),
  ("gui-035", 10.00, 38.00, 75.00, 1, "good", 8),
  ("gui-036", 10.00, 38.00, 75.00, 1, "good", 8),
  ("gui-037", 12.00, 45.00, 90.00, 1, "excellent", 8),

  -- Bass guitar (9) → gui-038 to gui-044
  ("gui-038", 11.00, 42.00, 85.00, 1, "excellent", 9),
  ("gui-039", 9.00, 35.00, 70.00, 1, "good", 9),
  ("gui-040", 9.00, 35.00, 70.00, 1, "good", 9),
  ("gui-041", 11.00, 42.00, 85.00, 1, "excellent", 9),
  ("gui-042", 9.00, 35.00, 70.00, 1, "good", 9),
  ("gui-043", 9.00, 35.00, 70.00, 1, "good", 9),
  ("gui-044", 11.00, 42.00, 85.00, 1, "excellent", 9),

  -- 12-string guitar (10) → gui-045 to gui-051
  ("gui-045", 13.00, 48.00, 95.00, 1, "excellent", 10),
  ("gui-046", 11.00, 40.00, 80.00, 1, "good", 10),
  ("gui-047", 11.00, 40.00, 80.00, 1, "good", 10),
  ("gui-048", 13.00, 48.00, 95.00, 1, "excellent", 10),
  ("gui-049", 11.00, 40.00, 80.00, 1, "good", 10),
  ("gui-050", 11.00, 40.00, 80.00, 1, "good", 10),
  ("gui-051", 13.00, 48.00, 95.00, 1, "excellent", 10),

  -- Travel guitar (11) → gui-052 to gui-058
  ("gui-052", 7.00, 25.00, 55.00, 1, "excellent", 11),
  ("gui-053", 6.00, 20.00, 45.00, 1, "good", 11),
  ("gui-054", 6.00, 20.00, 45.00, 1, "good", 11),
  ("gui-055", 7.00, 25.00, 55.00, 1, "excellent", 11),
  ("gui-056", 6.00, 20.00, 45.00, 1, "good", 11),
  ("gui-057", 6.00, 20.00, 45.00, 1, "good", 11),
  ("gui-058", 7.00, 25.00, 55.00, 1, "excellent", 11),

  -- Amazing piano (2) → pia-010 to pia-016
  ("pia-010", 50.00, 167.00, 359.99, 1, "excellent", 2),
  ("pia-011", 45.00, 150.00, 320.00, 1, "good", 2),
  ("pia-012", 45.00, 150.00, 320.00, 1, "good", 2),
  ("pia-013", 50.00, 167.00, 359.99, 1, "excellent", 2),
  ("pia-014", 45.00, 150.00, 320.00, 1, "good", 2),
  ("pia-015", 45.00, 150.00, 320.00, 1, "good", 2),
  ("pia-016", 50.00, 167.00, 359.99, 1, "excellent", 2),

  -- Grand piano (12) → pia-017 to pia-023
  ("pia-017", 80.00, 250.00, 599.99, 1, "excellent", 12),
  ("pia-018", 70.00, 220.00, 520.00, 1, "good", 12),
  ("pia-019", 70.00, 220.00, 520.00, 1, "good", 12),
  ("pia-020", 80.00, 250.00, 599.99, 1, "excellent", 12),
  ("pia-021", 70.00, 220.00, 520.00, 1, "good", 12),
  ("pia-022", 70.00, 220.00, 520.00, 1, "good", 12),
  ("pia-023", 80.00, 250.00, 599.99, 1, "excellent", 12),

  -- Upright piano (13) → pia-024 to pia-030
  ("pia-024", 40.00, 130.00, 280.00, 1, "excellent", 13),
  ("pia-025", 35.00, 110.00, 240.00, 1, "good", 13),
  ("pia-026", 35.00, 110.00, 240.00, 1, "good", 13),
  ("pia-027", 40.00, 130.00, 280.00, 1, "excellent", 13),
  ("pia-028", 35.00, 110.00, 240.00, 1, "good", 13),
  ("pia-029", 35.00, 110.00, 240.00, 1, "good", 13),
  ("pia-030", 40.00, 130.00, 280.00, 1, "excellent", 13),

  -- Digital piano (14) → pia-031 to pia-037
  ("pia-031", 30.00, 95.00, 199.99, 1, "excellent", 14),
  ("pia-032", 25.00, 80.00, 170.00, 1, "good", 14),
  ("pia-033", 25.00, 80.00, 170.00, 1, "good", 14),
  ("pia-034", 30.00, 95.00, 199.99, 1, "excellent", 14),
  ("pia-035", 25.00, 80.00, 170.00, 1, "good", 14),
  ("pia-036", 25.00, 80.00, 170.00, 1, "good", 14),
  ("pia-037", 30.00, 95.00, 199.99, 1, "excellent", 14),

  -- Smallest violin (3) → vio-012 to vio-018
  ("vio-012", 2.99, 10.00, 30.00, 1, "excellent", 3),
  ("vio-013", 2.99, 10.00, 30.00, 1, "excellent", 3),
  ("vio-014", 2.50, 8.00, 25.00, 1, "good", 3),
  ("vio-015", 2.99, 10.00, 30.00, 1, "excellent", 3),
  ("vio-016", 2.50, 8.00, 25.00, 1, "good", 3),
  ("vio-017", 2.50, 8.00, 25.00, 1, "good", 3),
  ("vio-018", 2.99, 10.00, 30.00, 1, "excellent", 3),

  -- Student violin (15) → vio-019 to vio-025
  ("vio-019", 2.50, 8.00, 22.00, 1, "excellent", 15),
  ("vio-020", 2.00, 6.50, 18.00, 1, "good", 15),
  ("vio-021", 2.00, 6.50, 18.00, 1, "good", 15),
  ("vio-022", 2.50, 8.00, 22.00, 1, "excellent", 15),
  ("vio-023", 2.00, 6.50, 18.00, 1, "good", 15),
  ("vio-024", 2.00, 6.50, 18.00, 1, "good", 15),
  ("vio-025", 2.50, 8.00, 22.00, 1, "excellent", 15),

  -- Professional violin (16) → vio-026 to vio-032
  ("vio-026", 8.00, 28.00, 70.00, 1, "excellent", 16),
  ("vio-027", 7.00, 24.00, 60.00, 1, "good", 16),
  ("vio-028", 7.00, 24.00, 60.00, 1, "good", 16),
  ("vio-029", 8.00, 28.00, 70.00, 1, "excellent", 16),
  ("vio-030", 7.00, 24.00, 60.00, 1, "good", 16),
  ("vio-031", 7.00, 24.00, 60.00, 1, "good", 16),
  ("vio-032", 8.00, 28.00, 70.00, 1, "excellent", 16),

  -- Electric violin (17) → vio-033 to vio-039
  ("vio-033", 6.00, 20.00, 50.00, 1, "excellent", 17),
  ("vio-034", 5.00, 17.00, 42.00, 1, "good", 17),
  ("vio-035", 5.00, 17.00, 42.00, 1, "good", 17),
  ("vio-036", 6.00, 20.00, 50.00, 1, "excellent", 17),
  ("vio-037", 5.00, 17.00, 42.00, 1, "good", 17),
  ("vio-038", 5.00, 17.00, 42.00, 1, "good", 17),
  ("vio-039", 6.00, 20.00, 50.00, 1, "excellent", 17),

  -- Rock drums (4) → dru-007 to dru-013
  ("dru-007", 20.00, 39.99, 100.00, 1, "excellent", 4),
  ("dru-008", 15.00, 32.00, 85.00, 1, "good", 4),
  ("dru-009", 15.00, 32.00, 85.00, 1, "good", 4),
  ("dru-010", 20.00, 39.99, 100.00, 1, "excellent", 4),
  ("dru-011", 15.00, 32.00, 85.00, 1, "good", 4),
  ("dru-012", 15.00, 32.00, 85.00, 1, "good", 4),
  ("dru-013", 20.00, 39.99, 100.00, 1, "excellent", 4),

  -- Jazz drum kit (18) → dru-014 to dru-020
  ("dru-014", 18.00, 55.00, 120.00, 1, "excellent", 18),
  ("dru-015", 15.00, 45.00, 100.00, 1, "good", 18),
  ("dru-016", 15.00, 45.00, 100.00, 1, "good", 18),
  ("dru-017", 18.00, 55.00, 120.00, 1, "excellent", 18),
  ("dru-018", 15.00, 45.00, 100.00, 1, "good", 18),
  ("dru-019", 15.00, 45.00, 100.00, 1, "good", 18),
  ("dru-020", 18.00, 55.00, 120.00, 1, "excellent", 18),

  -- Electronic drum kit (19) → dru-021 to dru-027
  ("dru-021", 22.00, 65.00, 140.00, 1, "excellent", 19),
  ("dru-022", 18.00, 55.00, 120.00, 1, "good", 19),
  ("dru-023", 18.00, 55.00, 120.00, 1, "good", 19),
  ("dru-024", 22.00, 65.00, 140.00, 1, "excellent", 19),
  ("dru-025", 18.00, 55.00, 120.00, 1, "good", 19),
  ("dru-026", 18.00, 55.00, 120.00, 1, "good", 19),
  ("dru-027", 22.00, 65.00, 140.00, 1, "excellent", 19),

  -- Elf's harp (5) → har-011 to har-017
  ("har-011", 25.00, 80.00, 150.00, 1, "good", 5),
  ("har-012", 28.00, 90.00, 170.00, 1, "excellent", 5),
  ("har-013", 25.00, 80.00, 150.00, 1, "good", 5),
  ("har-014", 28.00, 90.00, 170.00, 1, "excellent", 5),
  ("har-015", 25.00, 80.00, 150.00, 1, "good", 5),
  ("har-016", 28.00, 90.00, 170.00, 1, "excellent", 5),
  ("har-017", 25.00, 80.00, 150.00, 1, "good", 5),

  -- Lever harp (20) → har-018 to har-024
  ("har-018", 20.00, 65.00, 130.00, 1, "excellent", 20),
  ("har-019", 18.00, 58.00, 115.00, 1, "good", 20),
  ("har-020", 18.00, 58.00, 115.00, 1, "good", 20),
  ("har-021", 20.00, 65.00, 130.00, 1, "excellent", 20),
  ("har-022", 18.00, 58.00, 115.00, 1, "good", 20),
  ("har-023", 18.00, 58.00, 115.00, 1, "good", 20),
  ("har-024", 20.00, 65.00, 130.00, 1, "excellent", 20),

  -- Pedal harp (21) → har-025 to har-031
  ("har-025", 40.00, 130.00, 280.00, 1, "excellent", 21),
  ("har-026", 35.00, 110.00, 240.00, 1, "good", 21),
  ("har-027", 35.00, 110.00, 240.00, 1, "good", 21),
  ("har-028", 40.00, 130.00, 280.00, 1, "excellent", 21),
  ("har-029", 35.00, 110.00, 240.00, 1, "good", 21),
  ("har-030", 35.00, 110.00, 240.00, 1, "good", 21),
  ("har-031", 40.00, 130.00, 280.00, 1, "excellent", 21),

  -- Mini harp (22) → har-032 to har-038
  ("har-032", 10.00, 32.00, 70.00, 1, "excellent", 22),
  ("har-033", 8.00, 26.00, 58.00, 1, "good", 22),
  ("har-034", 8.00, 26.00, 58.00, 1, "good", 22),
  ("har-035", 10.00, 32.00, 70.00, 1, "excellent", 22),
  ("har-036", 8.00, 26.00, 58.00, 1, "good", 22),
  ("har-037", 8.00, 26.00, 58.00, 1, "good", 22),
  ("har-038", 10.00, 32.00, 70.00, 1, "excellent", 22),

  -- Big accordion (6) → acc-013 to acc-019
  ("acc-013", 20.00, 39.99, 98.00, 1, "good", 6),
  ("acc-014", 22.00, 45.00, 110.00, 1, "excellent", 6),
  ("acc-015", 20.00, 39.99, 98.00, 1, "good", 6),
  ("acc-016", 22.00, 45.00, 110.00, 1, "excellent", 6),
  ("acc-017", 20.00, 39.99, 98.00, 1, "good", 6),
  ("acc-018", 22.00, 45.00, 110.00, 1, "excellent", 6),
  ("acc-019", 20.00, 39.99, 98.00, 1, "good", 6),

  -- Piano accordion (23) → acc-020 to acc-026
  ("acc-020", 18.00, 55.00, 115.00, 1, "excellent", 23),
  ("acc-021", 15.00, 45.00, 95.00, 1, "good", 23),
  ("acc-022", 15.00, 45.00, 95.00, 1, "good", 23),
  ("acc-023", 18.00, 55.00, 115.00, 1, "excellent", 23),
  ("acc-024", 15.00, 45.00, 95.00, 1, "good", 23),
  ("acc-025", 15.00, 45.00, 95.00, 1, "good", 23),
  ("acc-026", 18.00, 55.00, 115.00, 1, "excellent", 23),

  -- Button accordion (24) → acc-027 to acc-033
  ("acc-027", 15.00, 45.00, 95.00, 1, "excellent", 24),
  ("acc-028", 12.00, 38.00, 80.00, 1, "good", 24),
  ("acc-029", 12.00, 38.00, 80.00, 1, "good", 24),
  ("acc-030", 15.00, 45.00, 95.00, 1, "excellent", 24),
  ("acc-031", 12.00, 38.00, 80.00, 1, "good", 24),
  ("acc-032", 12.00, 38.00, 80.00, 1, "good", 24),
  ("acc-033", 15.00, 45.00, 95.00, 1, "excellent", 24),

  -- Bass accordion (25) → acc-034 to acc-040
  ("acc-034", 22.00, 68.00, 145.00, 1, "excellent", 25),
  ("acc-035", 18.00, 55.00, 120.00, 1, "good", 25),
  ("acc-036", 18.00, 55.00, 120.00, 1, "good", 25),
  ("acc-037", 22.00, 68.00, 145.00, 1, "excellent", 25),
  ("acc-038", 18.00, 55.00, 120.00, 1, "good", 25),
  ("acc-039", 18.00, 55.00, 120.00, 1, "good", 25),
  ("acc-040", 22.00, 68.00, 145.00, 1, "excellent", 25),

  -- Toy accordion (26) → acc-041 to acc-047
  ("acc-041", 5.00, 15.00, 35.00, 1, "excellent", 26),
  ("acc-042", 4.00, 12.00, 28.00, 1, "good", 26),
  ("acc-043", 4.00, 12.00, 28.00, 1, "good", 26),
  ("acc-044", 5.00, 15.00, 35.00, 1, "excellent", 26),
  ("acc-045", 4.00, 12.00, 28.00, 1, "good", 26),
  ("acc-046", 4.00, 12.00, 28.00, 1, "good", 26),
  ("acc-047", 5.00, 15.00, 35.00, 1, "excellent", 26);