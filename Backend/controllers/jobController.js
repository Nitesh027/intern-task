import Job from '../models/Job.js';

// @desc    Get all jobs for logged in user
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user._id })
            .populate('user', 'name email')
            .sort({ created_at: -1 });
        
        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs: jobs
        });
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({
            success: false,
            error: "getJobs Server Error"
        });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
const getJob = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("getJob() | Started | id: " + id);
        
        const job = await Job.findById(id).populate('user', 'name email');
        
        if (!job) {
            return res.status(404).json({
                success: false,
                error: 'Job not found'
            });
        }

        // Check if job belongs to user
        if (job.user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this job'
            });
        }

        res.status(200).json({
            success: true,
            job: job
        });
    } catch (error) {
        console.error('Get job error:', error);
        res.status(500).json({
            success: false,
            error: "getJob Server Error"
        });
    }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const addJob = async (req, res) => {
    try {
        const { jobTitle, jobDescription, lastDate, companyName } = req.body;
        console.log("addJob() | Started | jobTitle: " + jobTitle);

        // Validation
        if (!jobTitle || !jobDescription || !lastDate || !companyName) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields: jobTitle, jobDescription, lastDate, companyName'
            });
        }

        const job = new Job({
            jobTitle,
            jobDescription,
            lastDate,
            companyName,
            user: req.user._id
        });

        await job.save();
        
        // Populate user data for response
        const populatedJob = await Job.findById(job._id).populate('user', 'name email');

        res.status(201).json({
            success: true,
            job: populatedJob
        });
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({
            success: false,
            error: "addJob Server Error"
        });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { jobTitle, jobDescription, lastDate, companyName } = req.body;
        
        let job = await Job.findById(id);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                error: 'Job not found'
            });
        }

        // Check if job belongs to user
        if (job.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to update this job'
            });
        }

        job.jobTitle = jobTitle || job.jobTitle;
        job.jobDescription = jobDescription || job.jobDescription;
        job.lastDate = lastDate || job.lastDate;
        job.companyName = companyName || job.companyName;
        job.updated_at = new Date();

        await job.save();
        
        const populatedJob = await Job.findById(job._id).populate('user', 'name email');

        res.status(200).json({
            success: true,
            job: populatedJob
        });
    } catch (error) {
        console.error('Update job error:', error);
        res.status(500).json({
            success: false,
            error: "updateJob Server Error"
        });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        
        const job = await Job.findById(id);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                error: 'Job not found'
            });
        }

        // Check if job belongs to user
        if (job.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to delete this job'
            });
        }

        await Job.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        console.error('Delete job error:', error);
        res.status(500).json({
            success: false,
            error: "deleteJob Server Error"
        });
    }
};

// @desc    Get job count for user
// @route   GET /api/jobs/count
// @access  Private
const getJobCount = async (req, res) => {
    try {
        const jobCount = await Job.countDocuments({ user: req.user._id });
        
        return res.status(200).json({ 
            success: true, 
            jobCount 
        });
    } catch (error) {
        console.error('Get job count error:', error);
        return res.status(500).json({ 
            success: false, 
            error: "getJobCount Server Error" 
        });
    }
};

export { getJobs, getJob, addJob, updateJob, deleteJob, getJobCount };