const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartLab API',
      version: '1.0.0',
      description: 'Campus Laboratory Monitoring System REST API',
    },
    servers: [{ url: 'http://localhost:3000/api', description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // ── Auth ──────────────────────────────────────────────────────────
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'admin@smartlab.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Login successful' },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                user: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },

        // ── Success / Error wrappers ──────────────────────────────────────
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Success' },
            data: { nullable: true },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Resource not found' },
            data: { nullable: true, example: null },
          },
        },

        // ── User ─────────────────────────────────────────────────────────
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Admin User' },
            email: { type: 'string', format: 'email', example: 'admin@smartlab.com' },
            role: { type: 'string', enum: ['admin', 'assistant'], example: 'admin' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateUserRequest: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            name: { type: 'string', example: 'Budi Santoso' },
            email: { type: 'string', format: 'email', example: 'budi@smartlab.com' },
            password: { type: 'string', example: 'password123' },
            role: { type: 'string', enum: ['admin', 'assistant'], example: 'assistant' },
          },
        },

        // ── Lab ──────────────────────────────────────────────────────────
        Lab: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Laboratorium Komputer 1' },
            code: { type: 'string', example: 'LAB-KOM-01' },
            capacity: { type: 'integer', example: 40 },
            status: { type: 'string', enum: ['active', 'inactive', 'maintenance'], example: 'active' },
            description: { type: 'string', example: 'Lab komputer untuk praktikum' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateLabRequest: {
          type: 'object',
          required: ['name', 'code', 'capacity'],
          properties: {
            name: { type: 'string', example: 'Laboratorium Komputer 1' },
            code: { type: 'string', example: 'LAB-KOM-01' },
            capacity: { type: 'integer', example: 40 },
            status: { type: 'string', enum: ['active', 'inactive', 'maintenance'], example: 'active' },
            description: { type: 'string', example: 'Lab komputer untuk praktikum' },
          },
        },

        // ── Course ───────────────────────────────────────────────────────
        Course: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Pemrograman Web' },
            code: { type: 'string', example: 'MK-PWB-01' },
            credits: { type: 'integer', example: 3 },
            description: { type: 'string', example: 'Mata kuliah pemrograman web' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateCourseRequest: {
          type: 'object',
          required: ['name', 'code', 'credits'],
          properties: {
            name: { type: 'string', example: 'Pemrograman Web' },
            code: { type: 'string', example: 'MK-PWB-01' },
            credits: { type: 'integer', example: 3 },
            description: { type: 'string', example: 'Mata kuliah pemrograman web' },
          },
        },

        // ── Course Schedule ───────────────────────────────────────────────
        CourseSchedule: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            lab_id: { type: 'integer', example: 1 },
            course_id: { type: 'integer', example: 1 },
            day: { type: 'string', enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'], example: 'monday' },
            start_time: { type: 'string', example: '08:00:00' },
            end_time: { type: 'string', example: '10:00:00' },
            semester: { type: 'string', example: 'Ganjil 2024/2025' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateCourseScheduleRequest: {
          type: 'object',
          required: ['lab_id', 'course_id', 'day', 'start_time', 'end_time', 'semester'],
          properties: {
            lab_id: { type: 'integer', example: 1 },
            course_id: { type: 'integer', example: 1 },
            day: { type: 'string', enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'], example: 'monday' },
            start_time: { type: 'string', example: '08:00:00' },
            end_time: { type: 'string', example: '10:00:00' },
            semester: { type: 'string', example: 'Ganjil 2024/2025' },
          },
        },

        // ── Booking ──────────────────────────────────────────────────────
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            lab_id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 2 },
            booking_date: { type: 'string', format: 'date', example: '2025-07-15' },
            start_time: { type: 'string', example: '09:00:00' },
            end_time: { type: 'string', example: '11:00:00' },
            purpose: { type: 'string', example: 'Praktikum Basis Data' },
            status: { type: 'string', enum: ['pending','approved','rejected','completed'], example: 'pending' },
            notes: { type: 'string', example: 'Mohon disetujui' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateBookingRequest: {
          type: 'object',
          required: ['lab_id', 'user_id', 'booking_date', 'start_time', 'end_time', 'purpose'],
          properties: {
            lab_id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 2 },
            booking_date: { type: 'string', format: 'date', example: '2025-07-15' },
            start_time: { type: 'string', example: '09:00:00' },
            end_time: { type: 'string', example: '11:00:00' },
            purpose: { type: 'string', example: 'Praktikum Basis Data' },
            notes: { type: 'string', example: 'Mohon disetujui' },
          },
        },
        UpdateBookingStatusRequest: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['approved','rejected','completed'], example: 'approved' },
          },
        },

        // ── Equipment ─────────────────────────────────────────────────────
        Equipment: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            lab_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Komputer Dell OptiPlex' },
            code: { type: 'string', example: 'EQ-PC-001' },
            quantity: { type: 'integer', example: 20 },
            condition: { type: 'string', enum: ['good','damaged','under_repair'], example: 'good' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateEquipmentRequest: {
          type: 'object',
          required: ['lab_id', 'name', 'code', 'quantity'],
          properties: {
            lab_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Komputer Dell OptiPlex' },
            code: { type: 'string', example: 'EQ-PC-001' },
            quantity: { type: 'integer', example: 20 },
            condition: { type: 'string', enum: ['good','damaged','under_repair'], example: 'good' },
          },
        },

        // ── Equipment Monitoring ──────────────────────────────────────────
        EquipmentMonitoring: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            equipment_id: { type: 'integer', example: 1 },
            assistant_id: { type: 'integer', example: 1 },
            check_date: { type: 'string', format: 'date', example: '2025-07-01' },
            condition: { type: 'string', enum: ['good','damaged','under_repair'], example: 'good' },
            notes: { type: 'string', example: 'Semua berfungsi normal' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateEquipmentMonitoringRequest: {
          type: 'object',
          required: ['equipment_id', 'check_date', 'condition'],
          properties: {
            equipment_id: { type: 'integer', example: 1 },
            assistant_id: { type: 'integer', example: 1, description: 'Admin only; assistant auto-filled' },
            check_date: { type: 'string', format: 'date', example: '2025-07-01' },
            condition: { type: 'string', enum: ['good','damaged','under_repair'], example: 'good' },
            notes: { type: 'string', example: 'Semua berfungsi normal' },
          },
        },

        // ── Lab Assistant ─────────────────────────────────────────────────
        LabAssistant: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 3 },
            student_id: { type: 'string', example: 'STD-2021-001' },
            phone: { type: 'string', example: '08123456789' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateLabAssistantRequest: {
          type: 'object',
          required: ['user_id', 'student_id'],
          properties: {
            user_id: { type: 'integer', example: 3 },
            student_id: { type: 'string', example: 'STD-2021-001' },
            phone: { type: 'string', example: '08123456789' },
          },
        },

        // ── Assistant Assignment ──────────────────────────────────────────
        AssistantAssignment: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            assistant_id: { type: 'integer', example: 1 },
            lab_id: { type: 'integer', example: 1 },
            day: { type: 'string', enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'], example: 'monday' },
            shift: { type: 'string', enum: ['morning','afternoon','evening'], example: 'morning' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateAssistantAssignmentRequest: {
          type: 'object',
          required: ['assistant_id', 'lab_id', 'day', 'shift'],
          properties: {
            assistant_id: { type: 'integer', example: 1 },
            lab_id: { type: 'integer', example: 1 },
            day: { type: 'string', enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'], example: 'monday' },
            shift: { type: 'string', enum: ['morning','afternoon','evening'], example: 'morning' },
          },
        },

        // ── Dashboard ─────────────────────────────────────────────────────
        DashboardSummary: {
          type: 'object',
          properties: {
            labs: {
              type: 'object',
              properties: {
                total: { type: 'integer', example: 5 },
                active: { type: 'integer', example: 3 },
                inactive: { type: 'integer', example: 1 },
                maintenance: { type: 'integer', example: 1 },
              },
            },
            bookings: {
              type: 'object',
              properties: {
                total: { type: 'integer', example: 20 },
                pending: { type: 'integer', example: 5 },
                approved: { type: 'integer', example: 10 },
                rejected: { type: 'integer', example: 3 },
                completed: { type: 'integer', example: 2 },
              },
            },
            damagedEquipment: { type: 'array', items: { $ref: '#/components/schemas/Equipment' } },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management (admin only)' },
      { name: 'Labs', description: 'Laboratory management' },
      { name: 'Courses', description: 'Course management (admin only)' },
      { name: 'Course Schedules', description: 'Lab course schedule management' },
      { name: 'Bookings', description: 'Lab booking management' },
      { name: 'Equipment', description: 'Equipment management' },
      { name: 'Equipment Monitoring', description: 'Equipment condition monitoring' },
      { name: 'Lab Assistants', description: 'Lab assistant profile management' },
      { name: 'Assistant Assignments', description: 'Assistant lab shift assignments' },
      { name: 'Dashboard', description: 'Admin dashboard summary (admin only)' },
    ],
    paths: {
      // ── Health ──────────────────────────────────────────────────────────
      '/health': {
        get: {
          tags: ['Auth'],
          summary: 'Health check',
          security: [],
          responses: {
            200: {
              description: 'API is running',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } },
            },
          },
        },
      },

      // ── Auth ────────────────────────────────────────────────────────────
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login and get JWT token',
          security: [],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            200: {
              description: 'Login successful',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } },
            },
            401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          },
        },
      },
      '/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current logged-in user profile',
          responses: {
            200: { description: 'Profile retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
          },
        },
      },

      // ── Users ────────────────────────────────────────────────────────────
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'Get all users (admin)',
          responses: {
            200: { description: 'List of users', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
          },
        },
        post: {
          tags: ['Users'],
          summary: 'Create a new user (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateUserRequest' } } } },
          responses: {
            201: { description: 'User created' },
            409: { description: 'Email already exists' },
          },
        },
      },
      '/users/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: {
          tags: ['Users'],
          summary: 'Get user by ID (admin)',
          responses: {
            200: { description: 'User found' },
            404: { description: 'User not found' },
          },
        },
        put: {
          tags: ['Users'],
          summary: 'Update user (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateUserRequest' } } } },
          responses: { 200: { description: 'User updated' }, 404: { description: 'User not found' } },
        },
        delete: {
          tags: ['Users'],
          summary: 'Delete user (admin)',
          responses: { 200: { description: 'User deleted' }, 404: { description: 'User not found' } },
        },
      },

      // ── Labs ─────────────────────────────────────────────────────────────
      '/labs': {
        get: {
          tags: ['Labs'],
          summary: 'Get all labs',
          parameters: [{ name: 'status', in: 'query', schema: { type: 'string', enum: ['active','inactive','maintenance'] } }],
          responses: { 200: { description: 'List of labs' } },
        },
        post: {
          tags: ['Labs'],
          summary: 'Create a new lab (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateLabRequest' } } } },
          responses: { 201: { description: 'Lab created' }, 409: { description: 'Lab code already exists' } },
        },
      },
      '/labs/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Labs'], summary: 'Get lab by ID', responses: { 200: { description: 'Lab found' }, 404: { description: 'Not found' } } },
        put: {
          tags: ['Labs'],
          summary: 'Update lab (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateLabRequest' } } } },
          responses: { 200: { description: 'Lab updated' } },
        },
        delete: { tags: ['Labs'], summary: 'Delete lab (admin)', responses: { 200: { description: 'Lab deleted' } } },
      },

      // ── Courses ──────────────────────────────────────────────────────────
      '/courses': {
        get: { tags: ['Courses'], summary: 'Get all courses (admin)', responses: { 200: { description: 'List of courses' } } },
        post: {
          tags: ['Courses'],
          summary: 'Create a new course (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCourseRequest' } } } },
          responses: { 201: { description: 'Course created' } },
        },
      },
      '/courses/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Courses'], summary: 'Get course by ID', responses: { 200: { description: 'Course found' }, 404: { description: 'Not found' } } },
        put: {
          tags: ['Courses'],
          summary: 'Update course (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCourseRequest' } } } },
          responses: { 200: { description: 'Course updated' } },
        },
        delete: { tags: ['Courses'], summary: 'Delete course (admin)', responses: { 200: { description: 'Course deleted' } } },
      },

      // ── Course Schedules ─────────────────────────────────────────────────
      '/course-schedules': {
        get: {
          tags: ['Course Schedules'],
          summary: 'Get all schedules (admin gets all, assistant gets assigned labs only)',
          parameters: [
            { name: 'lab_id', in: 'query', schema: { type: 'integer' } },
            { name: 'day', in: 'query', schema: { type: 'string', enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] } },
          ],
          responses: { 200: { description: 'List of schedules' } },
        },
        post: {
          tags: ['Course Schedules'],
          summary: 'Create a schedule (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCourseScheduleRequest' } } } },
          responses: { 201: { description: 'Schedule created' }, 409: { description: 'Time slot conflict' } },
        },
      },
      '/course-schedules/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Course Schedules'], summary: 'Get schedule by ID', responses: { 200: { description: 'Schedule found' }, 404: { description: 'Not found' } } },
        put: {
          tags: ['Course Schedules'],
          summary: 'Update schedule (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateCourseScheduleRequest' } } } },
          responses: { 200: { description: 'Schedule updated' } },
        },
        delete: { tags: ['Course Schedules'], summary: 'Delete schedule (admin)', responses: { 200: { description: 'Schedule deleted' } } },
      },

      // ── Bookings ─────────────────────────────────────────────────────────
      '/bookings': {
        get: {
          tags: ['Bookings'],
          summary: 'Get bookings (admin gets all, assistant gets assigned labs only)',
          parameters: [
            { name: 'user_id', in: 'query', schema: { type: 'integer' } },
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['pending','approved','rejected','completed'] } },
          ],
          responses: { 200: { description: 'List of bookings' } },
        },
        post: {
          tags: ['Bookings'],
          summary: 'Create a booking',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateBookingRequest' } } } },
          responses: { 201: { description: 'Booking created' }, 409: { description: 'Time slot conflict' } },
        },
      },
      '/bookings/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Bookings'], summary: 'Get booking by ID', responses: { 200: { description: 'Booking found' }, 404: { description: 'Not found' } } },
        delete: { tags: ['Bookings'], summary: 'Delete booking (admin)', responses: { 200: { description: 'Booking deleted' } } },
      },
      '/bookings/{id}/status': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        patch: {
          tags: ['Bookings'],
          summary: 'Update booking status (admin) — pending→approved/rejected, approved→completed',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateBookingStatusRequest' } } } },
          responses: { 200: { description: 'Status updated' }, 422: { description: 'Invalid status transition' } },
        },
      },

      // ── Equipment ────────────────────────────────────────────────────────
      '/equipment': {
        get: {
          tags: ['Equipment'],
          summary: 'Get equipment (admin gets all, assistant gets assigned labs only)',
          parameters: [{ name: 'lab_id', in: 'query', schema: { type: 'integer' } }],
          responses: { 200: { description: 'List of equipment' } },
        },
        post: {
          tags: ['Equipment'],
          summary: 'Create equipment (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateEquipmentRequest' } } } },
          responses: { 201: { description: 'Equipment created' } },
        },
      },
      '/equipment/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Equipment'], summary: 'Get equipment by ID', responses: { 200: { description: 'Equipment found' }, 404: { description: 'Not found' } } },
        put: {
          tags: ['Equipment'],
          summary: 'Update equipment (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateEquipmentRequest' } } } },
          responses: { 200: { description: 'Equipment updated' } },
        },
        delete: { tags: ['Equipment'], summary: 'Delete equipment (admin)', responses: { 200: { description: 'Equipment deleted' } } },
      },

      // ── Equipment Monitoring ─────────────────────────────────────────────
      '/equipment-monitoring': {
        get: {
          tags: ['Equipment Monitoring'],
          summary: 'Get monitoring records (admin gets all, assistant gets their own records)',
          parameters: [
            { name: 'equipment_id', in: 'query', schema: { type: 'integer' } },
            { name: 'assistant_id', in: 'query', schema: { type: 'integer' } },
          ],
          responses: { 200: { description: 'List of monitoring records' } },
        },
        post: {
          tags: ['Equipment Monitoring'],
          summary: 'Create monitoring record (assistant auto-fills their own ID)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateEquipmentMonitoringRequest' } } } },
          responses: { 201: { description: 'Record created' } },
        },
      },
      '/equipment-monitoring/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Equipment Monitoring'], summary: 'Get record by ID', responses: { 200: { description: 'Record found' }, 404: { description: 'Not found' } } },
        delete: { tags: ['Equipment Monitoring'], summary: 'Delete record (admin)', responses: { 200: { description: 'Record deleted' } } },
      },

      // ── Lab Assistants ───────────────────────────────────────────────────
      '/lab-assistants': {
        get: { tags: ['Lab Assistants'], summary: 'Get all lab assistants (admin)', responses: { 200: { description: 'List of assistants' } } },
        post: {
          tags: ['Lab Assistants'],
          summary: 'Create lab assistant profile (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateLabAssistantRequest' } } } },
          responses: { 201: { description: 'Assistant created' } },
        },
      },
      '/lab-assistants/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Lab Assistants'], summary: 'Get assistant by ID', responses: { 200: { description: 'Assistant found' }, 404: { description: 'Not found' } } },
        put: {
          tags: ['Lab Assistants'],
          summary: 'Update assistant (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateLabAssistantRequest' } } } },
          responses: { 200: { description: 'Assistant updated' } },
        },
        delete: { tags: ['Lab Assistants'], summary: 'Delete assistant (admin)', responses: { 200: { description: 'Assistant deleted' } } },
      },

      // ── Assistant Assignments ────────────────────────────────────────────
      '/assistant-assignments': {
        get: {
          tags: ['Assistant Assignments'],
          summary: 'Get assignments (admin gets all, assistant gets their own)',
          parameters: [
            { name: 'assistant_id', in: 'query', schema: { type: 'integer' } },
            { name: 'lab_id', in: 'query', schema: { type: 'integer' } },
          ],
          responses: { 200: { description: 'List of assignments' } },
        },
        post: {
          tags: ['Assistant Assignments'],
          summary: 'Create assignment (admin)',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateAssistantAssignmentRequest' } } } },
          responses: { 201: { description: 'Assignment created' }, 409: { description: 'Duplicate shift assignment' } },
        },
      },
      '/assistant-assignments/{id}': {
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        get: { tags: ['Assistant Assignments'], summary: 'Get assignment by ID', responses: { 200: { description: 'Assignment found' }, 404: { description: 'Not found' } } },
        delete: { tags: ['Assistant Assignments'], summary: 'Delete assignment (admin)', responses: { 200: { description: 'Assignment deleted' } } },
      },

      // ── Dashboard ────────────────────────────────────────────────────────
      '/dashboard': {
        get: {
          tags: ['Dashboard'],
          summary: 'Get dashboard summary (admin only)',
          responses: {
            200: {
              description: 'Dashboard data',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/SuccessResponse' },
                      { properties: { data: { $ref: '#/components/schemas/DashboardSummary' } } },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
